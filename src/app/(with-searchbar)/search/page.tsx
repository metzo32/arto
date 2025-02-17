"use client"

import SearchComp from "./searchComp"
import { Suspense } from "react"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"

export default function page() {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <SearchComp/>
    </Suspense>
  )
}