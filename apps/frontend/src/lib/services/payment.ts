interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

interface CreatePaymentResponse {
  id: string;
  checkout_url: string;
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const response = await fetch('https://gate.chip-in.asia/api/v1/payment_methods/', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHIP_API_KEY}`,
      },
      method: 'GET',
    });

    const data = await response.json();
    
    // Transform the response into a simpler format
    return Object.keys(data.names).map(key => ({
      id: key,
      name: data.names[key],
      logo: data.logos[key],
    }));
  } catch (error) {
    console.error('Failed to fetch payment methods:', error);
    return [];
  }
}

export async function createPayment(orderData: {
  amount: number;
  currency: string;
  customer: {
    email: string;
    phone: string;
    full_name: string;
  };
  reference: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}): Promise<CreatePaymentResponse> {
  try {
    const response = await fetch('https://gate.chip-in.asia/api/v1/purchases/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHIP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success_callback: `${window.location.origin}/thank-you`,
        failure_callback: `${window.location.origin}/order`,
        cancel_callback: `${window.location.origin}/order`,
        ...orderData,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Failed to create payment:', error);
    throw new Error('Payment creation failed');
  }
} 