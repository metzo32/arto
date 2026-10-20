"use client"

import { Suspense } from "react"
import SearchComp from "./_components/SearchComp"

export default function SeachPage() {
  return (
    <Suspense fallback={"로딩 중"}>
      <SearchComp/>
    </Suspense>
  )
}