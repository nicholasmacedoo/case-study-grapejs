import React, { useId } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form';

type FormData = {
    Id: null | string
    Assunto: string
    Nome: string
}

interface DialogSaveTemplateProps {
    onSubmit: (values: FormData) => void
    initialValue?: FormData & {
      Template?: string
    }
}

export function DialogSaveTemplate({ onSubmit, initialValue }: DialogSaveTemplateProps) {
    const id = useId();
    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            Id: initialValue?.Id ?? null,
            Assunto: initialValue?.Assunto ?? '',
            Nome: initialValue?.Nome ?? ''
        }
    });

    function handleOnSubmit(data: FormData) {
        const formdata = {
            ...data,
            Id: data.Id ?? id,
        }
        onSubmit(formdata)
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/5 data-[state=open]:animate-overlayShow fixed inset-0 z-98" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[99]">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Salvar modelo
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                Faça alterações no seu template de Email aqui. Clique em salvar quando terminar.
            </Dialog.Description>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="Assunto">
                    Assunto
                </label>
                <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="Assunto"
                    {...register('Assunto', { required: true })}
                />
                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="Name">
                    Nome
                </label>
                <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="Name"
                    {...register('Nome')}
                />
                </fieldset>
            <div className="mt-[25px] flex justify-end">
              {/* <Dialog.Close asChild> */}
                <button type='submit' className="bg-green-500 text-green-100 hover:bg-green-400 focus:shadow-green-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Save changes
                </button>
              {/* </Dialog.Close> */}
            </div>
            </form>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <X />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
    );
}
