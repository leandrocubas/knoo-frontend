export interface ICNPJWS {
    atualizado_em: string
    capital_social: string
    cnpj_raiz: string
    razao_social: string
    socios: Array<ISocios>
    estabelecimento: IEstabelecimento
    status?: number
    detalhes?: string
}

export interface ISocios {
    atualizado_em: string
    cpf_cnpj_socio: string
    cpf_representante_legal: string
    data_entrada: string
    faixa_etaria: string
    nome: string
    nome_representante: string
    pais_id: string
    qualificacao_socio: IQualificacaoSocio
}

export interface IQualificacaoSocio {
    descricao: string
    id: number
}

export interface IEstabelecimento {
    nome_fantasia: string
    cnpj: string
    cnpj_raiz: string
    atividade_principal: { subclasse: string }
}