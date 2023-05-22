export const objectsIugu = [
    {
        label: 'Nome cliente',
        value: '{{ invoice.customer_ref }}'
    },
    {
        label: 'Nome da sua conta iugu',
        value: '{{ invoice.account_name }}'
    },
    {
        label: 'Total fatura',
        value: '{{ invoice.total }}'
    },
    {
        label: 'Valor de imposto na fatura',
        value: '{{ invoice.tax }}'
    },
    {
        label: 'Valor desconto',
        value: '{{ invoice.discount }}'
    },
    {
        label: 'Data Vencimento',
        value: '{{ invoice.due_date | date: "%d/%m/%Y" }}'
    },
    {
        label: 'Data da última atualização da fatura',
        value: '{{ invoice.updated_at | date: "%d/%m/%Y" }}'
    },
]