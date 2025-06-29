"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1.0 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", rate: 92.5 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52 },
]

interface CurrencyContextType {
  selectedCurrency: Currency
  currencies: Currency[]
  convertPrice: (price: number) => number
  formatPrice: (price: number) => string
  changeCurrency: (currencyCode: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0])

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency")
    if (savedCurrency) {
      const currency = currencies.find((c) => c.code === savedCurrency)
      if (currency) {
        setSelectedCurrency(currency)
      }
    }
  }, [])

  // Save currency to localStorage when changed
  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency.code)
  }, [selectedCurrency])

  const convertPrice = (price: number): number => {
    return price * selectedCurrency.rate
  }

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price)
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(2)}`
  }

  const changeCurrency = (currencyCode: string) => {
    const currency = currencies.find((c) => c.code === currencyCode)
    if (currency) {
      setSelectedCurrency(currency)
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencies,
        convertPrice,
        formatPrice,
        changeCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
