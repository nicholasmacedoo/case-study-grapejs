"use client"
import { useEffect, useState } from "react"
import { useSearchParams , useRouter } from "next/navigation";
import Link from "next/link";

import grapesjs, { Editor } from 'grapesjs';
import pluginNewsletter from 'grapesjs-preset-newsletter';
import * as Dialog from '@radix-ui/react-dialog';

// @ts-ignore
import pt from 'grapesjs/locale/pt'
import { blocks } from "./utils/blocks-config";
import { objectsIugu } from "./utils/objects-tokens-iugu";


import { DialogSaveTemplate } from "./components/DialogSaveTemplate";
import { KEY_STORAGE_TEMPLATES } from "../page";
import 'grapesjs/dist/css/grapes.min.css';
import './styles/grape.css'

type TemplateEmailData = {
    Id: null | string
    Nome: string
    Assunto: string
    Template?: string
}

export default function Page() {
    const [editor, setEditor] = useState<Editor>()
    const [template, setTemplate] = useState<TemplateEmailData>()
    const router = useRouter()
    const searchParams = useSearchParams()

    function onSave(data: TemplateEmailData) {
        const templatesString = localStorage.getItem(KEY_STORAGE_TEMPLATES)
        const templatesConvert = JSON.parse(templatesString ?? '[]') as TemplateEmailData[]
        const templates = templatesConvert ?? [] as TemplateEmailData[]
        const checkExistsTemplate = templates.find(template => template.Id === data.Id)

        const newStateTemplates = checkExistsTemplate ? templates.map(template => {
            if(template.Id === data.Id) return data
            return template
        }) : [...templates, {
            ...data,
            Template: editor?.getHtml(),
        }];

        localStorage.setItem(KEY_STORAGE_TEMPLATES, JSON.stringify(newStateTemplates))

        router.push('/')
    }

    useEffect(() => {
        (() => {
            const initEditor = grapesjs.init({
                container: "#editor",
                height: '100vh',
                width: 'auto',
                plugins: [pluginNewsletter],
              
                i18n: {
                    locale: 'pt',
                    messages: { pt }
                },
                blockManager: {
                    blocks,
                }, 
                storageManager: {
                    autoload: false,
                }
            })
            initEditor.RichTextEditor.add('custom-vars', {
                name: "tokens-iugu",
                icon: `<select class="gjs-field">
                            <option value="" disabled> Variáveis disponíveis</option>
                            ${objectsIugu.map(object => `<option value='${object.value}'>${object.label}</option>`)}
                        </select>`,
                event: 'change',
                // @ts-ignore
                result: (rte, action) => rte.insertHTML(action.btn?.firstChild.value),
                // @ts-ignore
                update: (rte, action) => { action.btn.firstChild.value = "";}
            })
            setEditor(initEditor)

            const templateId = searchParams.get('id')

            if(templateId) {
                const templatesString = localStorage.getItem(KEY_STORAGE_TEMPLATES)
                const templatesConvert = JSON.parse(templatesString ?? '[]') as TemplateEmailData[]
                const templates = templatesConvert ?? [] as TemplateEmailData[]

                const template = templates.find(template => template.Id === templateId)

                if(template) {
                    setTemplate(template)
                    initEditor.setComponents(template.Template)
                    
                }

            }
        })();
        
    }, [searchParams])

    return (
        <>
            <div className="h-screen w-screen relative">
                <div id="editor"></div>
                <div className="h-[8rem] w-[15%] flex flex-col gap-2 bg-[#242424] absolute right-0 bottom-0 z-50 bg-[#242424] border-t border-[#1B1B1B] shadow-md p-4">
                    <Link href="/"
                    className="flex items-center justify-center py-2 px-6 w-full bg-gray-50/5 hover:bg-gray-50/10 text-white rounded-md">
                        Voltar
                    </Link>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button 
                                className="py-2 px-6 w-full bg-green-500 hover:bg-green-400 text-white rounded-md"
                            >
                                Salvar template
                            </button>
                        </Dialog.Trigger>
                        <DialogSaveTemplate initialValue={template} onSubmit={onSave} />
                    </Dialog.Root>
                </div>
            </div>

        </>
    )
}