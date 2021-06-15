const Customer  = require("../models/Customer")
var path = require('path');
var appDir = path.dirname(require.main.filename);
const template = require('../pdf/index');


const pdf = require('html-pdf');
 const savePdf = (pdfTemplate, fileName) => {
        pdf
        .create(pdfTemplate)
        .toFile(`${appDir}/pdf/files/${fileName}.pdf`, (err) => {
          if (err) {
            return { error: err };
          } else {
           return { success: 0 };
          }
        });
}


const reCreatePDF = async () => {
        const customers = await Customer.find().populate({ path: 'inventories', populate: { path: 'inventory' } });
        
        customers.forEach((customer) => {
                if (customer.inventories.length > 0) {
                        const groups = customer.inventories;
                        groups.forEach((group) => {
                                const items = group.inventory.items;
                                const originalPrice = items[3].text;
                                const params = {
                                        itemId: group._id,
                                        customerId: customer._id,
                                        itemName: `${items[0].text} ${items[1].text} ${items[2].text}`,
                                        date: "test",
                                        price: originalPrice,
                                        factureId:group._id,
                                        ville: customer.ville,
                                        country: customer.country,
                                        postalCode: customer.postalCode,
                                        phone: customer.phone,
                                        userName: `${customer.firstName} ${customer.lastName}`,
                                }
                                savePdf(template(params), group._id)
                        })
                }
        })
     
}

module.exports = {
        savePdf,
        reCreatePDF
      };