import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge, CheckCircle, XCircle } from 'lucide-react'

const users = [
  { id: 1, name: "Sandra Filly", score: 50000, grade: 45000, status: "collected" },
  { id: 2, name: "Bob Smith", score: 82, grade: 40000, status: "collected" },
  { id: 3, name: "Charlie Brown", score: 78, grade:35000, status: "collected" },
  { id: 4, name: "Diana Ross", score: 65, grade: 39000, status: "collected" },
  { id: 5, name: "Ethan Hunt", score: 90, grade: 39000, status: "collected" },
]

export default function UserGradesTable() {
  return (
    <div className="">
      <Table>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Image
                    src={`/sand.svg${user.name[0]}`}
                    alt={`${user.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.score}Tokens</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between">
                  {/* <Badge variant={user.status === "pass" ? "default" : "destructive"}>{user.grade}</Badge> */}
                  <div className="flex items-center space-x-2">
                    <div>
                    <h1 className="font-semibold">{user.grade}KG</h1>
                    <h1 className="text-sm text-gray-600">{user.status}</h1>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

