export function  getShippingRates(country) {
    let rate = 0;
    if (country === 'Nigeria') {
        rate = 11;
    } else {
        rate = 56;
    }
    return rate;
  };
export function  getInvoiceNumber(){
    const count = 6;
    let numbers = '';
    let i = 0;
    while ( i < count) {
        numbers += '' + Math.floor(Math.random() * 10);
        i++;
    }
    const invoiceNumber = Number(numbers);
    return invoiceNumber;
  };

export function  getReferenceCode(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const ref = text;
    return ref;
  };