/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function Hero({setSearch, search}:any) {
  
  const [balance, setBalance] = useState(0.00)

  const apiUrl = import.meta.env.VITE_API_URL
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    let mounted = true;
    async function getAmount() {
      if (!apiUrl) {
        console.warn("VITE_API_URL not set");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/v1/account/view`, {
          headers: token ? { authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          console.error("Failed to fetch balance", response.status);
          return;
        }

        const result = await response.json();
        console.log("balance fetch result:", result);

        const amount = typeof result?.amount === "number" ? result.amount : parseFloat(result?.amount ?? "0") || 0;
        if (mounted) setBalance(amount);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }

    getAmount();
    return () => {
      mounted = false;
    };
  }, [apiUrl, token]);

  return (
    <div className="w-full max-w-7xl flex flex-col gap-6 mt-20 py-3">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <p className=" flex flex-col gap-1 font-medium text-sm text-slate-500">
          Available Balance
          <span className="font-bold text-4xl text-slate-900">₹{balance}</span>
        </p>
      </Card>

      <div className="relative w-full max-w-2xl mx-auto">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search />
        </span>
        <Input
          className="form-input w-full rounded-lg border-slate-300  bg-white focus:border-primary focus:ring-primary pl-12 pr-4 py-3 text-base"
          placeholder="Search Users."
          value={search}
          name="search"
          type="text"
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
