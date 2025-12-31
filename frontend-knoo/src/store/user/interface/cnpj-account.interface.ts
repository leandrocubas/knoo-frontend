export interface ICNPJAccount {
    name: string
    document_cpf: string
    document_cnpj: string
    name_display: string
    phone: string
    cnae: string
    type_company_cnpj: string
    address_zipcode: string
    address_street: string
    address_number: string
    address_neighborhood: string
    address_city: string
    address_state: string
    last_contract?: string
    cnpj_card?: string
    monthly_income: number
    about: string
    social_media_link: string
    responsible_document_cpf: string
    responsible_name: string
    mother_name: string
    birth_date: string
    rg_selfie: string 
    rg_front: string
    rg_back: string
}