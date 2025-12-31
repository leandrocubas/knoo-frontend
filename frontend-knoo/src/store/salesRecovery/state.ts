import type { ISalesRecoveryState } from './interface/state.interface'

export const sales_recovery_state: ISalesRecoveryState = {
    isLoading: false,
    abandonedCartData: [
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, product: 'Viver de Código' },
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, product: 'Viver de Código' },
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, product: 'Viver de Código' },
    ],
    unpaidChargesData: [
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, paymentMethod: 'Boleto', status: 'Não pago'  },
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, paymentMethod: 'Boleto', status: 'Aguardando'  },
        { name: 'Bruno Lins', email: 'contato@linssolutions.com.br', cpf: 45038795889, phone: 11972339771, paymentMethod: 'Boleto', status: 'Aguardando'  },
    ]
}