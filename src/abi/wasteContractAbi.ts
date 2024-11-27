export const WASTE_CONTRACT_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_escrowContract",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "REQUESTNOTFOUND",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "FundsWithdrawn",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "_user",
				type: "address",
			},
			{
				indexed: false,
				internalType: "int32",
				name: "_latitude",
				type: "int32",
			},
			{
				indexed: false,
				internalType: "int32",
				name: "_longitude",
				type: "int32",
			},
		],
		name: "LocationSet",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
		],
		name: "LogFallback",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "LogReceive",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "recycler",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "_wasteType",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_pricePerKg",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_miniQuantity",
				type: "uint256",
			},
		],
		name: "OfferCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "requestID",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "collectorAddress",
				type: "address",
			},
		],
		name: "RequestAccepted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "_requestId",
				type: "uint256",
			},
		],
		name: "RequestCancelled",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "requestID",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "collectorAddress",
				type: "address",
			},
		],
		name: "RequestConfirmed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "requestID",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "offerId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "weight",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "priceAgreed",
				type: "uint256",
			},
		],
		name: "RequestCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isRegistered",
				type: "bool",
			},
		],
		name: "UserCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "collectorId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_collectorAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "_name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "_contact",
				type: "string",
			},
		],
		name: "collectorCreated",
		type: "event",
	},
	{
		stateMutability: "payable",
		type: "fallback",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestID",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_collectorAddress",
				type: "address",
			},
		],
		name: "acceptRequest",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestID",
				type: "uint256",
			},
		],
		name: "cancelRequestAndRefund",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestID",
				type: "uint256",
			},
		],
		name: "confirmRequest",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collectorAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
			{
				internalType: "string",
				name: "_contact",
				type: "string",
			},
		],
		name: "createCollector",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_wasteType",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_pricePerKg",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_miniQuantity",
				type: "uint256",
			},
		],
		name: "createOffer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recyclerAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "_location",
				type: "string",
			},
			{
				internalType: "int32",
				name: "lat",
				type: "int32",
			},
			{
				internalType: "int32",
				name: "lon",
				type: "int32",
			},
		],
		name: "createRecycler",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "escrowContract",
		outputs: [
			{
				internalType: "contract IEscrow",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllCollectorRequests",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllUserRequest",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "wasteType",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "escrowRequestID",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "amountPaid",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "weight",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "valuedAt",
						type: "uint256",
					},
					{
						internalType: "uint8",
						name: "offerId",
						type: "uint8",
					},
					{
						internalType: "int32",
						name: "longitude",
						type: "int32",
					},
					{
						internalType: "int32",
						name: "latitude",
						type: "int32",
					},
					{
						internalType: "address",
						name: "userAddress",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isCompleted",
						type: "bool",
					},
					{
						internalType: "enum GreenCycle.RequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "address",
						name: "assignedCollector",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isAccepted",
						type: "bool",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
				],
				internalType: "struct GreenCycle.WasteCollectionRequest[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_addr",
				type: "address",
			},
		],
		name: "getAllUserRequests",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "wasteType",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "escrowRequestID",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "amountPaid",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "weight",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "valuedAt",
						type: "uint256",
					},
					{
						internalType: "uint8",
						name: "offerId",
						type: "uint8",
					},
					{
						internalType: "int32",
						name: "longitude",
						type: "int32",
					},
					{
						internalType: "int32",
						name: "latitude",
						type: "int32",
					},
					{
						internalType: "address",
						name: "userAddress",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isCompleted",
						type: "bool",
					},
					{
						internalType: "enum GreenCycle.RequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "address",
						name: "assignedCollector",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isAccepted",
						type: "bool",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
				],
				internalType: "struct GreenCycle.WasteCollectionRequest[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "getCollector",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "collectorAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "contact",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "numberOfWasteCollected",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isAvailable",
						type: "bool",
					},
				],
				internalType: "struct GreenCycle.Collector",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "getRecyclerById",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "rating",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isRegistered",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "totalWasteRequest",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalAmountSpent",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalWasteCollectedInKgs",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Recycler",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recyclerAddress",
				type: "address",
			},
		],
		name: "getRecyclerCollectors",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "collectorAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "contact",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "numberOfWasteCollected",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isAvailable",
						type: "bool",
					},
				],
				internalType: "struct GreenCycle.Collector[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "getRecyclerOffers",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "recyclerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "pricePerKg",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "minQuantity",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Offer[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_recyclerId",
				type: "uint256",
			},
		],
		name: "getRecyclerRequests",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "wasteType",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "escrowRequestID",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "amountPaid",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "weight",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "valuedAt",
						type: "uint256",
					},
					{
						internalType: "uint8",
						name: "offerId",
						type: "uint8",
					},
					{
						internalType: "int32",
						name: "longitude",
						type: "int32",
					},
					{
						internalType: "int32",
						name: "latitude",
						type: "int32",
					},
					{
						internalType: "address",
						name: "userAddress",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isCompleted",
						type: "bool",
					},
					{
						internalType: "enum GreenCycle.RequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "address",
						name: "assignedCollector",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isAccepted",
						type: "bool",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
				],
				internalType: "struct GreenCycle.WasteCollectionRequest[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_userAddress",
				type: "address",
			},
		],
		name: "getUser",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "userAddress",
						type: "address",
					},
					{
						components: [
							{
								internalType: "int32",
								name: "latitude",
								type: "int32",
							},
							{
								internalType: "int32",
								name: "longitude",
								type: "int32",
							},
						],
						internalType: "struct GreenCycle.Coordinates",
						name: "location",
						type: "tuple",
					},
					{
						internalType: "bool",
						name: "isRegistered",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "totalWasteSubmited",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalReward",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.User",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_userAddress",
				type: "address",
			},
		],
		name: "getUserRole",
		outputs: [
			{
				internalType: "string",
				name: "role",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "addr",
				type: "address",
			},
			{
				internalType: "int32",
				name: "latitude",
				type: "int32",
			},
			{
				internalType: "int32",
				name: "longitude",
				type: "int32",
			},
			{
				internalType: "string",
				name: "location",
				type: "string",
			},
			{
				internalType: "bool",
				name: "isRegistered",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_recyclerId",
				type: "uint256",
			},
			{
				internalType: "uint8",
				name: "_offerId",
				type: "uint8",
			},
			{
				internalType: "uint32",
				name: "_weight",
				type: "uint32",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
			{
				internalType: "int32",
				name: "_latitude",
				type: "int32",
			},
			{
				internalType: "int32",
				name: "_longitude",
				type: "int32",
			},
			{
				internalType: "string",
				name: "_location",
				type: "string",
			},
		],
		name: "makeRequest",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_addr",
				type: "address",
			},
		],
		name: "recyclerOffers",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "recyclerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "pricePerKg",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "minQuantity",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Offer[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "recyclers",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "rating",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isRegistered",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "totalWasteRequest",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalAmountSpent",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalWasteCollectedInKgs",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Recycler",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "seeAllRecyclers",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "rating",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isRegistered",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "totalWasteRequest",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalAmountSpent",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalWasteCollectedInKgs",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Recycler[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestID",
				type: "uint256",
			},
		],
		name: "showRequest",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "wasteType",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "escrowRequestID",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "amountPaid",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "weight",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "valuedAt",
						type: "uint256",
					},
					{
						internalType: "uint8",
						name: "offerId",
						type: "uint8",
					},
					{
						internalType: "int32",
						name: "longitude",
						type: "int32",
					},
					{
						internalType: "int32",
						name: "latitude",
						type: "int32",
					},
					{
						internalType: "address",
						name: "userAddress",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isCompleted",
						type: "bool",
					},
					{
						internalType: "enum GreenCycle.RequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "address",
						name: "assignedCollector",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isAccepted",
						type: "bool",
					},
					{
						internalType: "string",
						name: "location",
						type: "string",
					},
				],
				internalType: "struct GreenCycle.WasteCollectionRequest",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_offerId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
			{
				internalType: "address",
				name: "_recyclerAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_pricePerKg",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_minQuantity",
				type: "uint256",
			},
		],
		name: "updateOffer",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "recyclerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "pricePerKg",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "minQuantity",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Offer",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestID",
				type: "uint256",
			},
		],
		name: "userCancelRequest",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recyclerAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_offerId",
				type: "uint256",
			},
		],
		name: "viewOffer",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "address",
						name: "recyclerAddress",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "recyclerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "pricePerKg",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "minQuantity",
						type: "uint256",
					},
				],
				internalType: "struct GreenCycle.Offer",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "withdrawFunds",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
	},
] as const;
