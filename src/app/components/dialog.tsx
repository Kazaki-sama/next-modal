"use client"
import React from "react"
import { useSearchParams } from "next/navigation"
import { useRef,useEffect } from "react"

type Props={
    title:string,
    onClose:()=> void,
    onOk:()=>void,
    children:React.ReactNode,
}

export default function Dialog({title, onClose,onOk,children}:Props) {
  
        const searchParams=useSearchParams();
        const dialogRef=useRef<null | HTMLDialogElement>(null)
        const showDialog=searchParams.get('showDialog')
        useEffect(()=>{
            if (showDialog==='y'){
                dialogRef.current?.showModal()
            }
            else{
                dialogRef.current?.close()
            }
        },[showDialog])
        const closeDialog=()=>{
            dialogRef.current?.close()
            onClose()
        }
        const clickOk=()=>{
            onOk()
            closeDialog()
        }

        const dialog: JSX.Element |null=showDialog==='y'
        ?(
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50">
                <div>
                    <div>
                        <h1>{title}</h1>
                        <button
                            onClick={closeDialog}
                        >x</button>
                    </div>
                    <div>
                        {children}
                        <div>
                            <button
                            onClick={clickOk}>OK
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        ):null
        return (
    <div>dialog</div>
  )
}
