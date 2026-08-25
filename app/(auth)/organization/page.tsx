import { OrganizationList } from "@clerk/nextjs"

export default function OrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/"
      afterCreateOrganizationUrl="/"
    />
  )
}
