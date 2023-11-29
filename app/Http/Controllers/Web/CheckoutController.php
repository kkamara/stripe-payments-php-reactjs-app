<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public function __construct() {
        Stripe::setApiKey(config("stripe.sk"));
    }

    public function checkout() {
        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items' => [[
              # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
              'price' => 'price_1OHlr8D8jILs1cs6SiBkLk5r',
              'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => 'http://localhost:3000?success=true',
            'cancel_url' => 'http://localhost:3000?canceled=true',
            'automatic_tax' => [
              'enabled' => true,
            ],
        ]);

        return redirect()->away($checkout_session->url);
    }
}
