"use client"
import { useEffect } from "react"
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs, { BlockProperties } from 'grapesjs';
import pluginNewsletter from 'grapesjs-preset-newsletter';
// @ts-ignore
import pt from 'grapesjs/locale/pt'
import { blocks } from "./utils/blocks-config";


export default function Page() {
  
    useEffect(() => {
        grapesjs.init({
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
            }
        })
    }, [])

    return (
        <div id="editor"></div>
    )
}