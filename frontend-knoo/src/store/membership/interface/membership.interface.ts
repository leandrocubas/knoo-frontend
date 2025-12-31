export interface IMembershipModule {
    module_name: string
    module_id: number
    is_selected: string
  }
  
  export interface IMembership {
    product_offering_id: string
    offer_name: string
    description: string
    id?: string
    modules?: IMembershipModule[]
  }
  
  export interface IMembershipOffer {
    id?: number
    offer_name: string
  }
  