
export const allTransactions = (a : any) => {
    const data : any  = []    
    
  a && a.pages &&  a.pages.map((page :any) => {
    
    data.push(...page[0].paymentWalletTransactions)
    })
    
    return data
}
