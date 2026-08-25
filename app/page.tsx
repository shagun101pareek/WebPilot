import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export default function Page() {
  return (
    <>
      <UserButton />
      <OrganizationSwitcher />
    </>
  )
}
