
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Receipt, WalletCards } from 'lucide-react';

interface FineRecord {
  id: string;
  amount: number;
  description: string;
  date: string;
  isPaid: boolean;
}

const PayFine = () => {
  const [fines] = useState<FineRecord[]>([
    {
      id: '1',
      amount: 3.50,
      description: 'Late return: "To Kill a Mockingbird"',
      date: '2023-05-15',
      isPaid: false,
    },
    {
      id: '2',
      amount: 5.00,
      description: 'Lost book: "The Hobbit"',
      date: '2023-04-20',
      isPaid: true,
    },
  ]);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalUnpaidFines = fines
    .filter(fine => !fine.isPaid)
    .reduce((total, fine) => total + fine.amount, 0);

  const handlePayFines = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `You have successfully paid $${totalUnpaidFines.toFixed(2)}.`,
      });
      // Here you would update the database to mark fines as paid
    }, 1500);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Manage Fines</h1>
          <p className="mt-2 text-muted-foreground">
            View and pay your outstanding library fines
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Outstanding Balance</CardTitle>
              <CardDescription>Your current unpaid fines</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="mb-6 text-center">
                <p className="text-4xl font-bold text-primary">${totalUnpaidFines.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total amount due</p>
              </div>
              <div className="space-y-4">
                {fines.filter(fine => !fine.isPaid).map((fine) => (
                  <div key={fine.id} className="flex items-start justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{fine.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Issued on {new Date(fine.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-medium">${fine.amount.toFixed(2)}</p>
                  </div>
                ))}
                {fines.filter(fine => !fine.isPaid).length === 0 && (
                  <p className="text-center text-muted-foreground">No outstanding fines</p>
                )}
              </div>
            </CardContent>
          </Card>

          {totalUnpaidFines > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Methods</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Tabs defaultValue="card">
                  <TabsList className="w-full">
                    <TabsTrigger value="card" className="flex-1">
                      <CreditCard className="mr-2 h-4 w-4" /> Card
                    </TabsTrigger>
                    <TabsTrigger value="online" className="flex-1">
                      <WalletCards className="mr-2 h-4 w-4" /> Online Banking
                    </TabsTrigger>
                    <TabsTrigger value="receipt" className="flex-1">
                      <Receipt className="mr-2 h-4 w-4" /> Receipt
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="4242 4242 4242 4242" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          placeholder="MM/YY" 
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          placeholder="123" 
                          value={cvc}
                          onChange={(e) => setCVC(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handlePayFines}
                      disabled={isProcessing || !cardNumber || !expiryDate || !cvc}
                    >
                      {isProcessing ? "Processing..." : `Pay $${totalUnpaidFines.toFixed(2)}`}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="online" className="mt-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Online banking payment option will be available soon.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="receipt" className="mt-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Generate a payment receipt to pay at the library desk.
                      </p>
                      <Button className="mt-4">Generate Receipt</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Payment History</CardTitle>
            <CardDescription>Your previous fine payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fines.filter(fine => fine.isPaid).map((fine) => (
                <div key={fine.id} className="flex items-start justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{fine.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Paid on {new Date(fine.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${fine.amount.toFixed(2)}</p>
                    <p className="text-xs text-green-600">Paid</p>
                  </div>
                </div>
              ))}
              {fines.filter(fine => fine.isPaid).length === 0 && (
                <p className="text-center text-muted-foreground">No payment history</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PayFine;
