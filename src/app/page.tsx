"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowSquareIn } from '@phosphor-icons/react'

export const KEY_STORAGE_TEMPLATES = "grapesjs-editor@items"

type TemplateEmailData = {
  Id: null | string
  Nome: string
  Assunto: string
  Template?: string
}

export default function Home() {

  const templatesString = localStorage.getItem(KEY_STORAGE_TEMPLATES)
  const templates = JSON.parse(templatesString ?? '[]') as TemplateEmailData[]

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex mb-16">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/cobranca.svg"
              alt="Next Logo"
              className="dark:invert"
              width={200}
              height={24}
              priority
            />
          </a>
        </div>
        <Link href="/grape-editor" className='py-4 px-6 bg-green-500 hover:bg-green-400 text-white rounded-md'>Criar template</Link>
      </div>
      <h1 className='font-bold text-gray-800 my-6'>Templates</h1>
      <div className="relative flex h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Nome
                </th>
                <th scope="col" className="px-6 py-3">
                    Assunto
                </th>
                <th scope="col" className="px-6 py-3">
  
                </th>
            </tr>
        </thead>
        <tbody>
          {templates.map(template => (
              <tr key={template.Id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {template.Id}
                  </th>
                  <td className="px-6 py-4">
                      {template.Nome}
                  </td>
                  <td className="px-6 py-4">
                      {template.Assunto}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/grape-editor?id=${template.Id}`} className='flex gap-2 w-fit items-center py-4 px-6 bg-slate-300 hover:bg-slate-400 text-white rounded-md'>
                      <ArrowSquareIn size={16} /> Editar
                    </Link>
                  </td>
              </tr>
          ))}
          
        </tbody>
    </table>
      </div>
    </main>
  )
}
