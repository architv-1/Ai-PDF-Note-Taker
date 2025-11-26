import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const pdfURL = "https://hip-cod-164.convex.cloud/api/storage/5154e67d-963a-439f-a75a-550dcd18022c"
export async function GET(req) {

    const response = await fetch(pdfURL)
    const data = await response.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()
    let pdfTextContent = ''
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent + doc.pageContent+""
    });

    
    const splitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000, 
        chunkOverlap: 20 
    
    })

    const output = await splitter.createDocuments([pdfTextContent])
    let splitterList = []
    output.forEach(doc => {
        splitterList.push(doc.pageContent)
    });

    return NextResponse.json({ result: splitterList })
}