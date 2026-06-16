export type DemoBill = {
    id: number;
    ownerName: string;
    billNumber: string;
    bankName: string;
    correspondentBill: string;
    BIC: string;
    INN: string;
    expireDate: string;
};

export type DemoProduct = {
    id: number;
    name: string;
    category: string;
    manufacturer: string;
    quantity: number;
    price: number;
    description: string;
    deliveryDays?: number;
    deliveryDate?: string;
};

export type DemoClient = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    birthday: string;
    added: string;
    bills: DemoBill[];
};

export type DemoProvider = {
    id: number;
    name: string;
    phone: string;
    address: string;
    added: string;
    bills: DemoBill[];
    products: DemoProduct[];
};

export type DemoCheque = {
    id: number;
    billNumber: string;
    price: number;
    status: string;
    expireDate: string;
};

export type DemoContract = {
    id: number;
    sellerName: string;
    buyerName: string;
    price: number;
    created: string;
    status: string;
    type: string;
    sellerBill: DemoBill;
    buyerBill: DemoBill;
    products: DemoProduct[];
    cheques: DemoCheque[];
};

export type DemoUser = {
    id: number;
    firstName: string;
    login: string;
    password: string;
    type: string;
    employmentDate?: string;
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const nextID = (items: { id: number }[]) => Math.max(0, ...items.map(item => item.id)) + 1;

export const demoUsers: DemoUser[] = [
    { id: 1, firstName: "Administrator", login: "admin", password: "admin", type: "admin" },
    { id: 2, firstName: "Dealer", login: "dealer", password: "dealer", type: "dealer", employmentDate: "2026-01-10" }
];

const bill = (id: number, ownerName: string, billNumber: string): DemoBill => ({
    id,
    ownerName,
    billNumber,
    bankName: "Demo Bank",
    correspondentBill: `30101810${id}0000000000`,
    BIC: `04452522${id}`,
    INN: `77000000${id}`,
    expireDate: "2027-12-31"
});

const products: DemoProduct[] = [
    {
        id: 1,
        name: "Office laptop",
        category: "Computers",
        manufacturer: "Contoso",
        quantity: 12,
        price: 95000,
        description: "Business laptop for dealer demo flows."
    },
    {
        id: 2,
        name: "Wireless scanner",
        category: "Equipment",
        manufacturer: "Northwind",
        quantity: 7,
        price: 32000,
        description: "Portable barcode scanner."
    },
    {
        id: 3,
        name: "Receipt printer",
        category: "Equipment",
        manufacturer: "Fabrikam",
        quantity: 18,
        price: 18500,
        description: "Compact thermal printer."
    }
];

export const db = {
    clients: [
        {
            id: 1,
            name: "Acme Retail",
            phone: "+7 495 100-10-10",
            email: "orders@acme.example",
            address: "Moscow, Tverskaya 1",
            birthday: "2019-03-14",
            added: "2026-01-12",
            bills: [bill(101, "Acme Retail", "40702810100000000101")]
        },
        {
            id: 2,
            name: "Beta Market",
            phone: "+7 812 200-20-20",
            email: "finance@beta.example",
            address: "Saint Petersburg, Nevsky 10",
            birthday: "2020-07-22",
            added: "2026-02-04",
            bills: [bill(102, "Beta Market", "40702810100000000102")]
        }
    ] as DemoClient[],
    providers: [
        {
            id: 1,
            name: "Contoso Supply",
            phone: "+7 495 300-30-30",
            address: "Moscow, Lenina 5",
            added: "2025-11-20",
            bills: [bill(201, "Contoso Supply", "40702810200000000201")],
            products: [{ ...products[0], deliveryDays: 5 }, { ...products[1], deliveryDays: 3 }]
        },
        {
            id: 2,
            name: "Fabrikam Parts",
            phone: "+7 343 400-40-40",
            address: "Ekaterinburg, Mira 12",
            added: "2025-12-08",
            bills: [bill(202, "Fabrikam Parts", "40702810200000000202")],
            products: [{ ...products[2], deliveryDays: 4 }]
        }
    ] as DemoProvider[],
    products: clone(products),
    dealerBills: [
        bill(301, "dealer", "40702810300000000301"),
        bill(302, "dealer", "40702810300000000302")
    ] as DemoBill[],
    contracts: [] as DemoContract[],
    users: clone(demoUsers)
};

db.contracts = [
    {
        id: 1,
        sellerName: "Contoso Supply",
        buyerName: "dealer",
        price: 95000,
        created: "2026-05-12",
        status: "open",
        type: "buy",
        sellerBill: clone(db.providers[0].bills[0]),
        buyerBill: clone(db.dealerBills[0]),
        products: [{ ...db.products[0], quantity: 1, deliveryDays: 5, deliveryDate: "2026-06-20" }],
        cheques: [{ id: 1, billNumber: "CHK-001", price: 95000, status: "unpaid", expireDate: "2026-07-12" }]
    },
    {
        id: 2,
        sellerName: "dealer",
        buyerName: "Acme Retail",
        price: 37000,
        created: "2026-05-24",
        status: "close",
        type: "sell",
        sellerBill: clone(db.dealerBills[1]),
        buyerBill: clone(db.clients[0].bills[0]),
        products: [{ ...db.products[2], quantity: 2, deliveryDate: "2026-06-01" }],
        cheques: [{ id: 2, billNumber: "CHK-002", price: 37000, status: "paid", expireDate: "2026-06-24" }]
    }
];

export const serializeClient = (client: DemoClient) => {
    const { bills, ...data } = client;
    return clone(data);
};

export const serializeProvider = (provider: DemoProvider) => {
    const { bills, products, ...data } = provider;
    return clone(data);
};

export const serializeBillNumber = (bill: DemoBill) => ({
    id: bill.id,
    billNumber: bill.billNumber
});

export const serializeName = (item: { id: number; name: string }) => ({
    id: item.id,
    name: item.name
});

export const serializeContract = (contract: DemoContract) => {
    const { sellerBill, buyerBill, products, cheques, ...data } = contract;
    return clone(data);
};

export const createID = nextID;
export const copy = clone;
