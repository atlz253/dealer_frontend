import { HttpResponse, http } from "msw";
import { baseURL } from "../api/APIconfig";
import {
    DemoBill,
    DemoClient,
    DemoContract,
    DemoProduct,
    DemoProvider,
    DemoUser,
    copy,
    createID,
    db,
    serializeBillNumber,
    serializeClient,
    serializeContract,
    serializeName,
    serializeProvider
} from "./db";

const api = (path: string) => `${baseURL}${path}`;
const notFound = () => HttpResponse.json({ message: "Not found" }, { status: 404 });
const unauthorized = () => HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
const ok = () => HttpResponse.json({ ok: true });

const getID = (value: unknown): number => Number(Array.isArray(value) ? value[0] : value);

const isTrue = (request: Request, param: string): boolean => {
    return new URL(request.url).searchParams.get(param) === "true";
};

const byID = <T extends { id: number }>(items: T[], id: number): T | undefined => {
    return items.find(item => item.id === id);
};

const createBill = (items: DemoBill[], data: DemoBill, ownerName: string) => {
    const bill = { ...data, id: createID(items), ownerName };
    items.push(bill);
    return bill;
};

const updateByID = <T extends { id: number }>(items: T[], id: number, data: T): boolean => {
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return false;
    }

    items[index] = { ...data, id };
    return true;
};

const deleteByID = <T extends { id: number }>(items: T[], id: number): boolean => {
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return false;
    }

    items.splice(index, 1);
    return true;
};

const findProviderProduct = (provider: DemoProvider, productID: number) => {
    return provider.products.find(product => product.id === productID);
};

const resolveContractParty = (type: string, sellerBillID: number, buyerBillID: number) => {
    const dealerSellerBill = byID(db.dealerBills, sellerBillID);
    const dealerBuyerBill = byID(db.dealerBills, buyerBillID);
    const provider = db.providers.find(provider => provider.bills.some(bill => bill.id === sellerBillID));
    const client = db.clients.find(client => client.bills.some(bill => bill.id === buyerBillID));

    if (type === "buy" && provider && dealerBuyerBill) {
        return {
            sellerName: provider.name,
            buyerName: "dealer",
            sellerBill: copy(provider.bills.find(bill => bill.id === sellerBillID) as DemoBill),
            buyerBill: copy(dealerBuyerBill)
        };
    }

    if (type === "sell" && dealerSellerBill && client) {
        return {
            sellerName: "dealer",
            buyerName: client.name,
            sellerBill: copy(dealerSellerBill),
            buyerBill: copy(client.bills.find(bill => bill.id === buyerBillID) as DemoBill)
        };
    }

    return null;
};

export const handlers = [
    http.post(api("/login"), async ({ request }) => {
        const credentials = await request.json() as { login?: string; password?: string };
        const user = db.users.find(user => user.login === credentials.login && user.password === credentials.password);

        if (!user || (user.login !== "admin" && user.login !== "dealer")) {
            return unauthorized();
        }

        return HttpResponse.json({
            accessToken: `mock-${user.type}-token`,
            login: user.login,
            type: user.type
        });
    }),

    http.get(api("/clients/count"), () => HttpResponse.json({ count: db.clients.length })),
    http.get(api("/clients"), ({ request }) => {
        if (isTrue(request, "onlyNames")) {
            return HttpResponse.json(db.clients.map(serializeName));
        }

        return HttpResponse.json(db.clients.map(serializeClient));
    }),
    http.post(api("/clients/new"), async ({ request }) => {
        const data = await request.json() as DemoClient;
        const client = { ...data, id: createID(db.clients), added: data.added || "2026-06-17", bills: [] };
        db.clients.push(client);
        return HttpResponse.json({ id: client.id });
    }),
    http.get(api("/clients/:clientID"), ({ params }) => {
        const client = byID(db.clients, getID(params.clientID));
        return client ? HttpResponse.json(serializeClient(client)) : notFound();
    }),
    http.put(api("/clients/:clientID"), async ({ params, request }) => {
        const id = getID(params.clientID);
        const current = byID(db.clients, id);
        const data = await request.json() as DemoClient;

        if (!current) {
            return notFound();
        }

        Object.assign(current, { ...data, id, bills: current.bills });
        return ok();
    }),
    http.delete(api("/clients/:clientID"), ({ params }) => {
        return deleteByID(db.clients, getID(params.clientID)) ? ok() : notFound();
    }),
    http.get(api("/clients/:clientID/bills"), ({ params, request }) => {
        const client = byID(db.clients, getID(params.clientID));

        if (!client) {
            return notFound();
        }

        return HttpResponse.json(isTrue(request, "onlyBillNumbers") ? client.bills.map(serializeBillNumber) : copy(client.bills));
    }),
    http.post(api("/clients/:clientID/bills/new"), async ({ params, request }) => {
        const client = byID(db.clients, getID(params.clientID));

        if (!client) {
            return notFound();
        }

        const bill = createBill(client.bills, await request.json() as DemoBill, client.name);
        return HttpResponse.json({ id: bill.id });
    }),
    http.get(api("/clients/:clientID/bills/:billID"), ({ params }) => {
        const client = byID(db.clients, getID(params.clientID));
        const bill = client && byID(client.bills, getID(params.billID));
        return bill ? HttpResponse.json(copy(bill)) : notFound();
    }),
    http.put(api("/clients/:clientID/bills/:billID"), async ({ params, request }) => {
        const client = byID(db.clients, getID(params.clientID));
        const billID = getID(params.billID);
        return client && updateByID(client.bills, billID, await request.json() as DemoBill) ? ok() : notFound();
    }),
    http.delete(api("/clients/:clientID/bills/:billID"), ({ params }) => {
        const client = byID(db.clients, getID(params.clientID));
        return client && deleteByID(client.bills, getID(params.billID)) ? ok() : notFound();
    }),

    http.get(api("/providers/count"), () => HttpResponse.json({ count: db.providers.length })),
    http.get(api("/providers"), ({ request }) => {
        if (isTrue(request, "onlyNames")) {
            return HttpResponse.json(db.providers.map(serializeName));
        }

        return HttpResponse.json(db.providers.map(serializeProvider));
    }),
    http.post(api("/providers/:providerID"), async ({ request }) => {
        const data = await request.json() as DemoProvider;
        const provider = { ...data, id: createID(db.providers), added: data.added || "2026-06-17", bills: [], products: [] };
        db.providers.push(provider);
        return HttpResponse.json({ id: provider.id });
    }),
    http.get(api("/providers/:providerID"), ({ params }) => {
        const provider = byID(db.providers, getID(params.providerID));
        return provider ? HttpResponse.json(serializeProvider(provider)) : notFound();
    }),
    http.put(api("/providers/:providerID"), async ({ params, request }) => {
        const id = getID(params.providerID);
        const current = byID(db.providers, id);
        const data = await request.json() as DemoProvider;

        if (!current) {
            return notFound();
        }

        Object.assign(current, { ...data, id, bills: current.bills, products: current.products });
        return ok();
    }),
    http.delete(api("/providers/:providerID"), ({ params }) => {
        return deleteByID(db.providers, getID(params.providerID)) ? ok() : notFound();
    }),
    http.get(api("/providers/:providerID/bills"), ({ params, request }) => {
        const provider = byID(db.providers, getID(params.providerID));

        if (!provider) {
            return notFound();
        }

        return HttpResponse.json(isTrue(request, "onlyBillNumbers") ? provider.bills.map(serializeBillNumber) : copy(provider.bills));
    }),
    http.post(api("/providers/:providerID/bills/new"), async ({ params, request }) => {
        const provider = byID(db.providers, getID(params.providerID));

        if (!provider) {
            return notFound();
        }

        const bill = createBill(provider.bills, await request.json() as DemoBill, provider.name);
        return HttpResponse.json({ id: bill.id });
    }),
    http.get(api("/providers/:providerID/bills/:billID"), ({ params }) => {
        const provider = byID(db.providers, getID(params.providerID));
        const bill = provider && byID(provider.bills, getID(params.billID));
        return bill ? HttpResponse.json(copy(bill)) : notFound();
    }),
    http.put(api("/providers/:providerID/bills/:billID"), async ({ params, request }) => {
        const provider = byID(db.providers, getID(params.providerID));
        const billID = getID(params.billID);
        return provider && updateByID(provider.bills, billID, await request.json() as DemoBill) ? ok() : notFound();
    }),
    http.delete(api("/providers/:providerID/bills/:billID"), ({ params }) => {
        const provider = byID(db.providers, getID(params.providerID));
        return provider && deleteByID(provider.bills, getID(params.billID)) ? ok() : notFound();
    }),
    http.get(api("/providers/:providerID/products"), ({ params }) => {
        const provider = byID(db.providers, getID(params.providerID));
        return provider ? HttpResponse.json(copy(provider.products)) : notFound();
    }),
    http.put(api("/providers/:providerID/products/:productID"), async ({ params, request }) => {
        const provider = byID(db.providers, getID(params.providerID));
        const product = byID(db.products, getID(params.productID));
        const data = await request.json() as { deliveryDays?: number };

        if (!provider || !product) {
            return notFound();
        }

        const existing = findProviderProduct(provider, product.id);

        if (existing) {
            existing.deliveryDays = data.deliveryDays;
        } else {
            provider.products.push({ ...product, deliveryDays: data.deliveryDays });
        }

        return ok();
    }),
    http.delete(api("/providers/:providerID/products/:productID"), ({ params }) => {
        const provider = byID(db.providers, getID(params.providerID));

        if (!provider) {
            return notFound();
        }

        provider.products = provider.products.filter(product => product.id !== getID(params.productID));
        return ok();
    }),

    http.get(api("/products/count"), () => HttpResponse.json({ count: db.products.length })),
    http.get(api("/products"), () => HttpResponse.json(copy(db.products))),
    http.post(api("/products/new"), async ({ request }) => {
        const data = await request.json() as DemoProduct;
        const product = { ...data, id: createID(db.products) };
        db.products.push(product);
        return HttpResponse.json({ id: product.id });
    }),
    http.get(api("/products/:productID"), ({ params }) => {
        const product = byID(db.products, getID(params.productID));
        return product ? HttpResponse.json(copy(product)) : notFound();
    }),
    http.put(api("/products/:productID"), async ({ params, request }) => {
        const id = getID(params.productID);
        return updateByID(db.products, id, await request.json() as DemoProduct) ? ok() : notFound();
    }),
    http.delete(api("/products/:productID"), ({ params }) => {
        return deleteByID(db.products, getID(params.productID)) ? ok() : notFound();
    }),

    http.get(api("/bills"), ({ request }) => {
        return HttpResponse.json(isTrue(request, "onlyBillNumbers") ? db.dealerBills.map(serializeBillNumber) : copy(db.dealerBills));
    }),
    http.post(api("/bills/new"), async ({ request }) => {
        const bill = createBill(db.dealerBills, await request.json() as DemoBill, "dealer");
        return HttpResponse.json({ id: bill.id });
    }),
    http.get(api("/bills/:billID"), ({ params }) => {
        const bill = byID(db.dealerBills, getID(params.billID));
        return bill ? HttpResponse.json(copy(bill)) : notFound();
    }),
    http.put(api("/bills/:billID"), async ({ params, request }) => {
        return updateByID(db.dealerBills, getID(params.billID), await request.json() as DemoBill) ? ok() : notFound();
    }),
    http.delete(api("/bills/:billID"), ({ params }) => {
        return deleteByID(db.dealerBills, getID(params.billID)) ? ok() : notFound();
    }),

    http.get(api("/contracts/count"), ({ request }) => {
        const status = new URL(request.url).searchParams.get("contractStatus");
        const contracts = status ? db.contracts.filter(contract => contract.status === status) : db.contracts;
        return HttpResponse.json({ count: contracts.length });
    }),
    http.get(api("/contracts"), () => HttpResponse.json(db.contracts.map(serializeContract))),
    http.post(api("/contracts/new"), async ({ request }) => {
        const data = await request.json() as {
            sellerBillID: number;
            buyerBillID: number;
            type: string;
            products: Array<{ id: number; quantity: number; deliveryDays?: number }>;
        };
        const party = resolveContractParty(data.type, data.sellerBillID, data.buyerBillID);

        if (!party) {
            return notFound();
        }

        const contractProducts = data.products.map(product => {
            const source = byID(db.products, product.id);
            return {
                ...(source as DemoProduct),
                quantity: product.quantity,
                deliveryDays: product.deliveryDays,
                deliveryDate: "2026-07-01"
            };
        });
        const price = contractProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const contract: DemoContract = {
            id: createID(db.contracts),
            sellerName: party.sellerName,
            buyerName: party.buyerName,
            price,
            created: "2026-06-17",
            status: "open",
            type: data.type,
            sellerBill: party.sellerBill,
            buyerBill: party.buyerBill,
            products: contractProducts,
            cheques: [{ id: createID([]), billNumber: `CHK-${createID(db.contracts)}`, price, status: "unpaid", expireDate: "2026-07-17" }]
        };

        db.contracts.push(contract);
        return HttpResponse.json({ id: contract.id });
    }),
    http.get(api("/contracts/:contractID"), ({ params }) => {
        const contract = byID(db.contracts, getID(params.contractID));
        return contract ? HttpResponse.json(copy(contract)) : notFound();
    }),
    http.put(api("/contracts/:contractID/cheques/:chequeID"), async ({ params, request }) => {
        const contract = byID(db.contracts, getID(params.contractID));
        const chequeID = getID(params.chequeID);
        const cheque = await request.json() as DemoContract["cheques"][number];

        if (!contract || !updateByID(contract.cheques, chequeID, cheque)) {
            return notFound();
        }

        contract.status = contract.cheques.every(cheque => cheque.status !== "unpaid") ? "close" : "open";
        return ok();
    }),

    http.get(api("/queries"), () => HttpResponse.json([
        {
            name: "Reports",
            items: [
                { name: "Contracts", link: "/reports/contracts.xlsx" },
                { name: "Products", link: "/reports/products.xlsx" }
            ]
        }
    ])),
    http.get(api("/reports/:fileName"), ({ params }) => {
        return new HttpResponse(`Demo report: ${String(params.fileName)}`, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        });
    }),

    http.get(api("/users"), () => HttpResponse.json(copy(db.users))),
    http.post(api("/users/new"), async ({ request }) => {
        const data = await request.json() as DemoUser;
        const user = { ...data, id: createID(db.users) };
        db.users.push(user);
        return HttpResponse.json({ id: user.id });
    }),
    http.get(api("/users/:userID"), ({ params }) => {
        const user = byID(db.users, getID(params.userID));
        return user ? HttpResponse.json(copy(user)) : notFound();
    }),
    http.put(api("/users/:userID"), async ({ params, request }) => {
        return updateByID(db.users, getID(params.userID), await request.json() as DemoUser) ? ok() : notFound();
    }),
    http.delete(api("/users/:userID"), ({ params }) => {
        return deleteByID(db.users, getID(params.userID)) ? ok() : notFound();
    })
];
