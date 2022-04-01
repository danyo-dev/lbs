import { ActionFunction, json } from "remix"
import { requireAuthentication } from "~/services/auth.server"
import { brzAuthenticationHandler, postStammDaten } from "~/services/brzService"

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request)

  const brzSession = await brzAuthenticationHandler(request)
  const formData = await request.formData()
  const formDataToObjectMapping = [
    "vorname",
    "name",
    "geb",
    "email",
    "strasse",
    "strasse2",
    "plz",
    "ort",
    "land",
    "staatsangehoerigkeit",
    "anrede",
  ].reduce((total, curr) => {
    return { ...total, [curr]: formData.get(curr) }
  }, {})

  const stammDaten = await postStammDaten(
    brzSession,
    formDataToObjectMapping as any
  )

  console.log(stammDaten)

  return request.formData()
}
