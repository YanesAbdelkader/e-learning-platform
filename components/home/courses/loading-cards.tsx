import { Card, CardContent } from "@/components/ui/card"

type LoadingCardsProps = {
  count: number
}

export function LoadingCards({ count }: LoadingCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <Card key={index} className="overflow-hidden flex flex-col h-full animate-pulse">
          <div className="h-48 bg-muted rounded-t-lg"></div>
          <CardContent className="p-5 flex flex-col flex-grow space-y-3">
            <div className="h-6 bg-muted rounded-md w-3/4"></div>
            <div className="h-4 bg-muted rounded-md w-1/2"></div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-muted"></div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto pt-3">
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
              <div className="h-9 bg-muted rounded-md w-1/3"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

