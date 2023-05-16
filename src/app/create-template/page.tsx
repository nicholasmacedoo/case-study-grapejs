"use client"
import { useRef } from "react"
import { EditorRef, EmailEditor, MergeTag } from "react-email-editor";

const tags: MergeTag[] = [
    {
        name: 'Nome do cliente',
        value: '{{invoice.customer_ref}}',
        sample: 'Joe Doe'
    },
    {
        name: 'Data de Vencimento',
        value: '{{invoice.due_date}}',
        sample: 'dd/mm/yyyy'
    }
]
export default function Page() {
    const emailEditorRef = useRef<EditorRef>(null)

    function handleExportHTML() {
        emailEditorRef.current?.exportHtml(data => {
            console.log(data.html)
        })
    }

    return (
        <div className="h-screen w-screen bg-slate-100 grid grid-cols-[100px_1fr]">
            <div className="bg-blue-500"></div>
            <div className="h-full flex relative">
                <div className="pt-6 flex flex-col flex-1 h-full">
                    <div className="h-[64px] w-full">

                    </div>
                    <EmailEditor 
                        ref={emailEditorRef} 
                        style={{ height: '100%' }} 
                        editorId="editor-default" 
                        appearance={{
                            // theme: 'dark',
                        }}
                        locale="pt-BR" 
                        options={{
                            mergeTags: tags
                        }}
                    />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <button 
                        className="p-4 bg-green-400 hover:bg-green-300 ease-in text-white font-bold rounded-sm" 
                        onClick={handleExportHTML}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}