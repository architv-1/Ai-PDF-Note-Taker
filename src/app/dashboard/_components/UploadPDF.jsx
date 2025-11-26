"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useAction, useMutation } from 'convex/react'
import { Loader2Icon } from 'lucide-react'
import { api } from '../../../../convex/_generated/api'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

function UploadPDF({children}) {

  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const getFileURL = useMutation(api.pdfStorage.getFileURL)
  const embeddDocument = useAction(api.ingest.ingest)
  const {user} = useUser()
  const addFileEntry = useMutation(api.pdfStorage.AddFileToDB)
  const [loading , setLoading] = useState(false)
  const [file,setFile] = useState()
  const [fileName, setFileName] = useState()
  const OnFileSelect= (e)=>{
    setFile(e.target.files[0])
  }

  const OnUpload=async()=>{
    setLoading(true)

    // const postUrl = await generateUploadUrl();

    //  const result = await fetch(postUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": file?.type },
    //   body: file,
    // });
    // const { storageId } = await result.json();
  
    // console.log("Storage ID", storageId)

    // const fileID =  uuid4();
    // const fileURL = await getFileURL({ storageID: storageId });


    // const res = await addFileEntry({
    //   fileID: fileID,
    //   storageID:storageId,
    //   fileName: fileName??'Untitled File',
    //   fileURL:fileURL,
    //   createdBy: user?.primaryEmailAddress?.emailAddress
    // })

    // console.log(res)

    const ApiResponse = await axios.get('/api/pdf-loader')

    console.log(ApiResponse.data.result)
    await embeddDocument({});
    setLoading(false)
  }


  return (
    <div>
     <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="mt-10">
                <h2>Select a File to Upload</h2>
                <div className="border gap-2 p-3 rounded-md">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={OnFileSelect}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label>File Name*</label>
                <Input
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <Button onClick={OnUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : null}
            Upload
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UploadPDF
