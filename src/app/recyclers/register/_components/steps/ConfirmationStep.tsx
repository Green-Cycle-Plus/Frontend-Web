export function ConfirmationStep() {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Confirmation and Approval</h2>
        <svg
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-32 mx-auto"
        >
          <path
            d="M20 60L80 90L180 30"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M40 30h120v60H40z"
            fill="#4CAF50"
            fillOpacity="0.2"
          />
          <path
            d="M40 30l60 30 60-30"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M160 90l-60-30-60 30"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="100"
            x2="30"
            y2="100"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="110"
            x2="25"
            y2="110"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">
            Your account has been submitted for approval.
          </h3>
          <p className="text-sm text-muted-foreground">
            Approval takes up to 24 hours.
          </p>
        </div>
      </div>
    )
  }