import Game from "@/app/database/game.model";
import ConnectDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const {slug} = await params

        function createSearchTerm(slug:string) {
        const words = slug.trim().split(/\s+/);

        const escape = (str:string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const exact = escape(slug);
        const firstTwo = words.length >= 2
        ? escape(words.slice(0, 2).join(' '))
        : null;
        const first = escape(words[0]);

        return {
        exact: new RegExp(`\\b${exact}\\b`, 'i'),
        firstTwo: firstTwo ? new RegExp(`\\b${firstTwo}\\b`, 'i') :null,
        first: new RegExp(`\\b${first}\\b`, 'i')
        };
    }
    const {exact,firstTwo,first} = createSearchTerm(slug)
    const games = await Game.aggregate([
        {
            $addFields: {
            relevance: {
                $switch: {
                branches: [
                    {case:{$or:[{ $regexMatch: { input: "$title", regex: exact }}, {
              $anyElementTrue: {
                $map: {
                  input: "$tags",
                  as: "tag",
                  in: { $regexMatch: { input: "$$tag", regex: exact } }
                }
              }
            }]},then:3},
                    {case:firstTwo && {$or:[{ $regexMatch: { input: "$title", regex: firstTwo }}, {
              $anyElementTrue: {
                $map: {
                  input: "$tags",
                  as: "tag",
                  in: { $regexMatch: { input: "$$tag", regex: firstTwo } }
                }
              }
            }]},then:2},
                    {case:{$or:[{ $regexMatch: { input: "$title", regex: first }}, {
              $anyElementTrue: {
                $map: {
                  input: "$tags",
                  as: "tag",
                  in: { $regexMatch: { input: "$$tag", regex: first } }
                }
              }
            }]},then:1}
                ],
                default: 0
                }}}
        },
        {$match: { relevance: { $gt: 0 } }},
        {$sort: { relevance: -1 }}
        ]);
   
        return NextResponse.json({message:'success',games},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"Cant find any results",error},{status:400})
    }
   
}