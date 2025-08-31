import { useState } from 'react'
import { Check, ChevronDown, ChevronRight, List, Loader } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/shared/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'
import { Input } from '@/shared/ui/components/ui/input'
import { Label } from '@/shared/ui/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/components/ui/tabs'

function Home() {
  const [isRotated, setIsRotated] = useState(false)

  const handleClick = () => {
    setIsRotated((prev) => !prev)
  }
  return (
    <main className="flex justify-center items-center text-center h-dvh">
      <div className="flex flex-col gap-y-8">
        <h1 className="!font-normal">Todos</h1>
        <div className="self-center w-[500px]">
          <div className="flex items-center gap-x-2.5 mb-8">
            <Button variant="outline" onClick={handleClick}>
              <motion.div
                animate={{ rotate: isRotated ? -180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ display: 'flex' }}
              >
                <ChevronDown />
              </motion.div>
            </Button>

            <Input placeholder="Прочитать книгу?" />

            <Button>
              <ChevronRight />
            </Button>
          </div>
          <div>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <Tabs defaultValue="all">
                <TabsContent value="all">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Todos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="active">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you&apos;ll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-current">
                          Current password
                        </Label>
                        <Input id="tabs-demo-current" type="password" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-new">New password</Label>
                        <Input id="tabs-demo-new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsList>
                  <TabsTrigger value="all">
                    All todo <List />
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active <Loader className="text-amber-600" />
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed
                    <Check className="text-green-400" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
