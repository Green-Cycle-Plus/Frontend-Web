export const WASTE_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_escrowContract",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ALLREADY_ACCEPTED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ALREADY_ACCEPTED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ALREADY_COMPLETED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "AMOUNT_LESS_THAN_AMOUNT_VALUED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "COLLECTORALREADYADDED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDAMOUNT",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDLATITUTUDE",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDLONGITUDE",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDOFFERNAME",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDPRICE",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDQUANTITY",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALIDRECYCLER",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LOWER_THAN_MINQUANTITY",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_ACCEPTED_YET",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_ASSIGNED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_AUTHORIZED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_FOUND",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_REGISTERED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OFFERNOTFOUND",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ONLY_A_RECYCLER",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RECYCLERNOTFOUND",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RECYCLER_ALREADY_REGISTERED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "REGISTERED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "REQUESTALREADYASSIGNED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "REQUESTNOTFOUND",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestID",
                "type": "uint256"
            }
        ],
        "name": "CollectionRequestCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "_latitude",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "_longitude",
                "type": "int32"
            }
        ],
        "name": "LocationSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "LogFallback",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "LogReceive",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "latitude",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "longitude",
                "type": "int32"
            }
        ],
        "name": "NewUserJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "recycler",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_wasteType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_pricePerKg",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_miniQuantity",
                "type": "uint256"
            }
        ],
        "name": "OfferCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_recyclerAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_recyclerId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_location",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "lat",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "lon",
                "type": "int32"
            }
        ],
        "name": "RecyclerCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "collectorAddress",
                "type": "address"
            }
        ],
        "name": "RequestAccepted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_requestId",
                "type": "uint256"
            }
        ],
        "name": "RequestCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "collectorAddress",
                "type": "address"
            }
        ],
        "name": "RequestConfirmed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "priceAgreed",
                "type": "uint256"
            }
        ],
        "name": "RequestCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "collectorId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_collectorAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_contact",
                "type": "string"
            }
        ],
        "name": "collectorCreated",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_collectorAddress",
                "type": "address"
            }
        ],
        "name": "acceptRequest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "allUserRequest",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountPaid",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isAccepted",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "assignedCollector",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "escrowRequestID",
                "type": "uint256"
            },
            {
                "internalType": "enum WasteManagement.RequestStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestID",
                "type": "uint256"
            }
        ],
        "name": "cancelRequestAndRefund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "collectors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "collectorAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "contact",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "numberOfWasteCollected",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isAvailable",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "collectorsRequests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestID",
                "type": "uint256"
            }
        ],
        "name": "confirmRequest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_collectorAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_contact",
                "type": "string"
            }
        ],
        "name": "createCollector",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_wasteType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerKg",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_miniQuantity",
                "type": "uint256"
            }
        ],
        "name": "createOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            },
            {
                "internalType": "int32",
                "name": "lat",
                "type": "int32"
            },
            {
                "internalType": "int32",
                "name": "lon",
                "type": "int32"
            }
        ],
        "name": "createRecycler",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "escrowContract",
        "outputs": [
            {
                "internalType": "contract IEscrow",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllCollectorRequests",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllUserRequest",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weight",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "valuedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountPaid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCompleted",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAccepted",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "assignedCollector",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "escrowRequestID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WasteManagement.RequestStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct WasteManagement.WasteCollectionRequest[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getRecyclerById",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rating",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct WasteManagement.Recycler",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_recyclerAddress",
                "type": "address"
            }
        ],
        "name": "getRecyclerCollectors",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "collectorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "contact",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "numberOfWasteCollected",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAvailable",
                        "type": "bool"
                    }
                ],
                "internalType": "struct WasteManagement.Collector[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getRecyclerOffers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "recyclerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerKg",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minQuantity",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct WasteManagement.Offer[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_recyclerId",
                "type": "uint256"
            }
        ],
        "name": "getRecyclerRequests",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weight",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "valuedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountPaid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCompleted",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAccepted",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "assignedCollector",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "escrowRequestID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WasteManagement.RequestStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct WasteManagement.WasteCollectionRequest[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "getUserRole",
        "outputs": [
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "internalType": "int32",
                "name": "latitude",
                "type": "int32"
            },
            {
                "internalType": "int32",
                "name": "longitude",
                "type": "int32"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_recyclerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_offerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_weight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "int32",
                "name": "_latitude",
                "type": "int32"
            },
            {
                "internalType": "int32",
                "name": "_longitude",
                "type": "int32"
            }
        ],
        "name": "makeRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numOfCollector",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numOfRequest",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numberOfRecyclers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "recyclerCordinates",
        "outputs": [
            {
                "internalType": "int32",
                "name": "latitude",
                "type": "int32"
            },
            {
                "internalType": "int32",
                "name": "longitude",
                "type": "int32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "recyclerOffers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "recyclerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pricePerKg",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minQuantity",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "recyclerRequests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountPaid",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isAccepted",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "assignedCollector",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "escrowRequestID",
                "type": "uint256"
            },
            {
                "internalType": "enum WasteManagement.RequestStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "recyclers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "recyclersById",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seeAllRecyclers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rating",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct WasteManagement.Recycler[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestID",
                "type": "uint256"
            }
        ],
        "name": "showRequest",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weight",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "valuedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountPaid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCompleted",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAccepted",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "assignedCollector",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "escrowRequestID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WasteManagement.RequestStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct WasteManagement.WasteCollectionRequest",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_offerId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerKg",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minQuantity",
                "type": "uint256"
            }
        ],
        "name": "updateOffer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "recyclerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerKg",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minQuantity",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct WasteManagement.Offer",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestID",
                "type": "uint256"
            }
        ],
        "name": "userCancelRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userWasteRequests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountPaid",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isAccepted",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "assignedCollector",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "escrowRequestID",
                "type": "uint256"
            },
            {
                "internalType": "enum WasteManagement.RequestStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "int32",
                        "name": "latitude",
                        "type": "int32"
                    },
                    {
                        "internalType": "int32",
                        "name": "longitude",
                        "type": "int32"
                    }
                ],
                "internalType": "struct WasteManagement.Coordinates",
                "name": "location",
                "type": "tuple"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_recyclerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_offerId",
                "type": "uint256"
            }
        ],
        "name": "viewOffer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "recyclerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "recyclerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerKg",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minQuantity",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct WasteManagement.Offer",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
] as const