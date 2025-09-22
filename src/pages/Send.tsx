import { PaymentFailedCard } from "@/components/Error";
import { TransactionSuccessCard } from "@/components/TransferSuccess";
import { ArrowBigUp } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Send() {

  const [SearchParams] = useSearchParams();
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const sendTo = SearchParams.get("to");
  const Id = SearchParams.get("id");

  const url = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");

  async function sendMoney() {
    setError(null);
    setSuccess(false);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    if (!Id) {
      setError("Recipient ID is missing.");
      return;
    }

    if (!url) {
      setError("API URL is not configured.");
      return;
    }

    setLoading(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["authorization"] = `Bearer ${token}`;

      const response = await fetch(`${url}/api/v1/account/transfer`, {
        method: "POST",
        headers,
        body: JSON.stringify({ amount, sendTo: Id }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => undefined);
        setError(`Server responded with ${response.status}${text ? `: ${text}` : ''}`);
      } else {
        const result = await response.json().catch(() => null);
        if(result.message.includes('Insufficient')){
          setError(result.message)
          setSuccess(false)
        }else{
          console.log("Transfer result:", result);
          setError(null);
          setSuccess(true); 
        }
        
      }
    } catch (err: unknown) {
      console.error(err);
      const messageRaw = typeof err === 'object' && err !== null && 'message' in err ? (err as { message?: string }).message : String(err);
      const message = messageRaw ?? String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex justify-center py-8 text-center">
        <TransactionSuccessCard
        receiverName={sendTo?sendTo:'Unknown'}
        amount={amount?amount:0.00}
        />
      </div>
    );
  }

if (error) {
  return (
    <div className="flex justify-center mt-16 py-8 text-center">
      <PaymentFailedCard
      errorMessage={error?error:"your payment failed try again or try later"}
      onContactSupport={()=>{}}
      onReturnDashboard={()=>navigate('/')}
      onTryAgain={()=>{navigate('/send?to='+sendTo+"&id="+Id) 
        setError(null)}}
      receiverName={sendTo?sendTo:'Unknown'}
      />
    </div>
  );
}

return (
    <div className="w-full max-w-md mx-auto mt-16 py-8">
      <div className="bg-white dark:bg-black/20 rounded-xl shadow-sm border border-black/5 dark:border-white/5 p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">
              <ArrowBigUp />
            </span>
          </div>
        </div>

        {/* Amount */}
        <p className="text-sm text-black/60 dark:text-white/60 mb-2">You're sending</p>
        <div className="relative mb-4 w-full max-w-xs mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-black/70 dark:text-white/70">₹</span>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount ?? ''}
            onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full pl-10 pr-4 py-3 text-4xl font-bold text-black/90 dark:text-white/90 bg-transparent border-b-2 border-black/20 dark:border-white/20 focus:outline-none focus:border-primary text-center"
          />
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm text-black/60 dark:text-white/60">
          <div className="flex justify-between items-center bg-background-light dark:bg-background-dark/50 p-3 rounded-lg">
            <span>To:</span>ed
            <span className="font-medium text-black/80 dark:text-white/80">{sendTo}</span>
          </div>
          <div className="flex justify-between items-center bg-background-light dark:bg-background-dark/50 p-3 rounded-lg">
            <span>Fee:</span>
            <span className="font-medium text-black/80 dark:text-white/80">$0.00</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={sendMoney}
            disabled={loading || !amount || Number(amount) <= 0}
            className="w-full bg-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Money'}
          </button>
          <button className="w-full bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 font-bold py-3 px-5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            Cancel
          </button>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  );
}

