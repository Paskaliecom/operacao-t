"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Heart, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>("Help")

  const CartIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 1024 1024" className={className} fill="currentColor">
      <path d="M384 775.3c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.9-54.8 0-30.3 24.6-54.9 54.9-54.9z m365.7 0c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.8-54.8 0-30.3 24.6-54.9 54.8-54.9z m-636.9-636.8l4.1 0.5 83.3 16c43.5 8.4 77.2 42.8 84.6 86.5l3 18.1 454.4 0.1c80.8 0 146.3 65.5 146.2 146.2 0 7.8-0.6 15.6-1.8 23.3l-26.7 165.3c-11.1 69.1-70.8 119.9-140.8 120l-310 0c-71.3 0-131.7-52.7-141.3-123.4l-39.8-291.1c-0.1-0.6-0.3-1.2-0.4-1.8l-7.7-45.7c-2.8-16.5-15.6-29.6-32.1-32.8l-83.4-16c-17.9-3.4-29.5-20.7-26.1-38.6 2.9-15.1 15.7-25.8 30.4-26.6l4.1 0z m629.4 187l-444.3 0 35.1 256.7c5.2 38 37.7 66.4 76.1 66.4l310 0c37.7 0 69.8-27.4 75.8-64.5l26.7-165.3c0.7-4.2 1-8.5 1-12.9 0-44.4-36-80.5-80.4-80.4z" />
    </svg>
  )

  const productImages = [
    "/placeholder.svg?height=400&width=400&text=Image+1",
    "/placeholder.svg?height=400&width=400&text=Image+2",
    "/placeholder.svg?height=400&width=400&text=Image+3",
    "/placeholder.svg?height=400&width=400&text=Image+4",
    "/placeholder.svg?height=400&width=400&text=Image+5",
    "/placeholder.svg?height=400&width=400&text=Image+6",
    "/placeholder.svg?height=400&width=400&text=Image+7",
  ]

  const relatedProducts = [
    {
      id: 1,
      name: "Kitchen Storage Rack",
      price: "$45.99",
      originalPrice: "$65.99",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Pantry Organizer Set",
      price: "$32.99",
      originalPrice: "$49.99",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Spice Rack Cabinet",
      price: "$28.99",
      originalPrice: "$39.99",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Kitchen Cabinet Organizer",
      price: "$52.99",
      originalPrice: "$79.99",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Maria K.",
      initial: "M",
      color: "bg-orange-500",
      rating: 5,
      date: "2 days ago",
      text: "Perfect for my kitchen! The quality is amazing and it fits perfectly in my pantry. Assembly was straightforward and the shelves are very sturdy.",
      helpful: 12,
      hasPhotos: true,
    },
    {
      id: 2,
      name: "John D.",
      initial: "J",
      color: "bg-blue-500",
      rating: 4,
      date: "1 week ago",
      text: "Good value for money. The cabinet is solid and has plenty of storage space. Only minor issue was one of the screws was missing but customer service sent a replacement quickly.",
      helpful: 8,
      hasPhotos: false,
    },
    {
      id: 3,
      name: "Sarah L.",
      initial: "S",
      color: "bg-purple-500",
      rating: 5,
      date: "2 weeks ago",
      text: "Exceeded my expectations! The finish looks premium and it's very spacious. Perfect for organizing all my kitchen supplies. Highly recommend!",
      helpful: 15,
      hasPhotos: false,
    },
    {
      id: 4,
      name: "Mike R.",
      initial: "M",
      color: "bg-green-500",
      rating: 5,
      date: "3 weeks ago",
      text: "Excellent build quality and very easy to assemble. The adjustable shelves are a great feature. Fits perfectly in my small kitchen space.",
      helpful: 9,
      hasPhotos: true,
    },
    {
      id: 5,
      name: "Lisa T.",
      initial: "L",
      color: "bg-pink-500",
      rating: 4,
      date: "1 month ago",
      text: "Really happy with this purchase. The cabinet is sturdy and looks great. Only wish it came in more color options.",
      helpful: 6,
      hasPhotos: false,
    },
    {
      id: 6,
      name: "David W.",
      initial: "D",
      color: "bg-indigo-500",
      rating: 5,
      date: "1 month ago",
      text: "Amazing storage solution! The quality is top-notch and it was surprisingly easy to put together. Great value for the price.",
      helpful: 11,
      hasPhotos: true,
    },
  ]

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(expandedFooterSection === section ? null : section)
  }

  useEffect(() => {
    const loadShopifyBuyButton = () => {
      const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"

      const ShopifyBuyInit = () => {
        if (window.ShopifyBuy && window.ShopifyBuy.UI) {
          const client = window.ShopifyBuy.buildClient({
            domain: "nkgzhm-1d.myshopify.com",
            storefrontAccessToken: "a2573f84312eb27417abbd6671a74bb9",
          })

          window.ShopifyBuy.UI.onReady(client).then((ui) => {
            ui.createComponent("product", {
              id: "9911594352952",
              node: document.getElementById("product-component-1751534676989"),
              moneyFormat: "%24%7B%7Bamount%7D%7D",
              options: {
                product: {
                  styles: {
                    product: {
                      "@media (min-width: 601px)": {
                        "max-width": "calc(25% - 20px)",
                        "margin-left": "20px",
                        "margin-bottom": "50px",
                      },
                    },
                    button: {
                      "font-weight": "bold",
                      ":hover": {
                        "background-color": "#e06813",
                      },
                      "background-color": "#f97315",
                      ":focus": {
                        "background-color": "#e06813",
                      },
                      "padding-left": "98px",
                      "padding-right": "98px",
                    },
                  },
                  contents: {
                    img: false,
                    title: false,
                    price: false,
                  },
                  text: {
                    button: "Add to cart",
                  },
                },
                productSet: {
                  styles: {
                    products: {
                      "@media (min-width: 601px)": {
                        "margin-left": "-20px",
                      },
                    },
                  },
                },
                modalProduct: {
                  contents: {
                    img: false,
                    imgWithCarousel: true,
                    button: false,
                    buttonWithQuantity: true,
                  },
                  styles: {
                    product: {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0px",
                        "margin-bottom": "0px",
                      },
                    },
                    button: {
                      "font-weight": "bold",
                      ":hover": {
                        "background-color": "#e06813",
                      },
                      "background-color": "#f97315",
                      ":focus": {
                        "background-color": "#e06813",
                      },
                      "padding-left": "98px",
                      "padding-right": "98px",
                    },
                  },
                  text: {
                    button: "Add to cart",
                  },
                },
                option: {},
                cart: {
                  styles: {
                    button: {
                      "font-weight": "bold",
                      ":hover": {
                        "background-color": "#e06813",
                      },
                      "background-color": "#f97315",
                      ":focus": {
                        "background-color": "#e06813",
                      },
                    },
                  },
                  text: {
                    total: "Subtotal",
                    button: "Checkout",
                  },
                },
                toggle: {
                  styles: {
                    toggle: {
                      "font-weight": "bold",
                      "background-color": "#f97315",
                      ":hover": {
                        "background-color": "#e06813",
                      },
                      ":focus": {
                        "background-color": "#e06813",
                      },
                    },
                  },
                },
              },
            })
          })
        }
      }

      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit()
        } else {
          const script = document.createElement("script")
          script.async = true
          script.src = scriptURL
          document.head.appendChild(script)
          script.onload = ShopifyBuyInit
        }
      } else {
        const script = document.createElement("script")
        script.async = true
        script.src = scriptURL
        document.head.appendChild(script)
        script.onload = ShopifyBuyInit
      }
    }

    loadShopifyBuyButton()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 flex-1">
            <Image src="/temu-logo.png" alt="TEMU" width={40} height={16} className="h-4 w-auto" />

            <div className="flex-1 max-w-md mx-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2">
                <svg viewBox="0 0 1024 1024" className="h-4 w-4 text-gray-500" fill="currentColor">
                  <path d="M458.1 118.6c211.3 0 382.7 171.3 382.7 382.6 0 84.8-27.6 163.2-74.3 226.6l144.1 126.4c13.4 11.8 14.8 32.2 3 45.6-10.5 11.9-27.8 14.3-40.9 6.4l-4.8-3.4-144-126.3c-68.8 66.5-162.5 107.4-265.8 107.4-211.3 0-382.7-171.3-382.6-382.7 0-211.3 171.3-382.7 382.6-382.6z m0 64.6c-175.6 0-318 142.4-318 318 0 175.6 142.4 318 318 318 175.6 0 318-142.4 318-318 0-175.6-142.4-318-318-318z"></path>
                </svg>
                <span className="text-gray-500 text-sm truncate">kitchen pantry cabinet...</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1">
              <svg viewBox="0 0 1024 1024" className="h-6 w-6" fill="currentColor">
                <path d="M831 234.8c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6l-438.9 0c-20.2 0-36.6-16.4-36.5-36.6 0-20.2 16.4-36.6 36.5-36.6l438.9 0z m-618.9 83.4c26.3 0 47.5-21.3 47.6-47.6 0-26.3-21.3-47.5-47.6-47.5-26.3 0-47.5 21.3-47.5 47.5 0 26.3 21.3 47.5 47.5 47.6z m618.9 399.4c20.2 0 36.6 16.4 36.6 36.5 0 20.2-16.4 36.6-36.6 36.6l-438.9 0c-20.2 0-36.6-16.4-36.5-36.6 0-20.2 16.4-36.6 36.5-36.5l438.9 0z m-618.9 83.3c26.3 0 47.5-21.3 47.6-47.5 0-26.3-21.3-47.5-47.6-47.6-26.3 0-47.5 21.3-47.5 47.6 0 26.3 21.3 47.5 47.5 47.5z m618.9-324.7c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.5l-438.9 0c-20.2 0-36.6-16.4-36.5-36.5 0-20.2 16.4-36.6 36.5-36.6l438.9 0z m-618.9 83.3c26.3 0 47.5-21.3 47.6-47.5 0-26.3-21.3-47.5-47.6-47.5-26.3 0-47.5 21.3-47.5 47.5 0 26.3 21.3 47.5 47.5 47.5z" />
              </svg>
            </button>

            <button className="p-1">
              <svg viewBox="0 0 1024 1024" className="h-6 w-6" fill="currentColor">
                <path d="M510.8 541.3c204.6 0 323.6 71 356.9 213 8.9 38.1-14.8 76.3-52.9 85.2-5.3 1.2-10.8 1.9-16.3 1.8l-575.5 0c-39.2-0.1-70.9-31.9-70.8-71 0-5.4 0.6-10.8 1.9-16 33.2-142 152.1-213 356.7-213z m0 65.8c-176.9 0-267.3 54-292.6 162.1-0.1 0.4-0.1 0.8-0.2 1.2 0 2.8 2.3 5.1 5 5.1l575.7 0c0.4 0 0.8 0 1.1-0.1 2.7-0.6 4.4-3.4 3.8-6.1-25.4-108.2-115.9-162.2-292.8-162.2z m1.2-501c99 0 179.2 80.2 179.2 179.2 0 99-80.2 179.2-179.2 179.2-99 0-179.2-80.2-179.2-179.2 0-99 80.2-179.2 179.2-179.2z m0 65.8c-62.6 0-113.4 50.8-113.4 113.4 0 62.6 50.8 113.4 113.4 113.3 62.6 0 113.4-50.8 113.4-113.3 0-62.6-50.8-113.4-113.4-113.4z" />
              </svg>
            </button>

            <div className="relative">
              <button onClick={() => setShowCart(!showCart)} className="relative p-1">
                <CartIcon className="h-6 w-6" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              {showCart && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold mb-3">Shopping Cart</h3>
                    {cartItems === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Image
                            src="/placeholder.svg?height=60&width=60"
                            alt="Product"
                            width={60}
                            height={60}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">Kitchen Storage Cabinet</h4>
                            <p className="text-sm text-gray-600">Qty: {quantity}</p>
                            <p className="text-sm font-semibold text-red-600">$73.57</p>
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-lg text-red-600">${(73.57 * quantity).toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600">Checkout</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="relative">
          <div
            className="w-full h-80 overflow-hidden"
            onTouchStart={(e) => {
              const touch = e.touches[0]
              setTouchStart(touch.clientX)
            }}
            onTouchMove={(e) => {
              if (!touchStart) return
              const touch = e.touches[0]
              const diff = touchStart - touch.clientX

              if (Math.abs(diff) > 50) {
                if (diff > 0 && selectedImage < productImages.length - 1) {
                  setSelectedImage(selectedImage + 1)
                } else if (diff < 0 && selectedImage > 0) {
                  setSelectedImage(selectedImage - 1)
                }
                setTouchStart(null)
              }
            }}
            onTouchEnd={() => setTouchStart(null)}
          >
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="Storage Cabinet"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-4 left-4">
            <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              <span>
                {selectedImage + 1}/{productImages.length}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                backgroundColor: "#264AD2",
                backgroundImage:
                  "url(https://aimg.kwcdn.com/material-put/20237f66ca/22f47927-8436-479b-8bae-6cd0ea7189c4.png?imageView2/2/w/750/q/80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <Image
                src="https://aimg.kwcdn.com/material-put/20237f66ca/bc78c8f3-253e-4e39-a1ff-0b0dd9d6b2f2.png?imageView2/2/w/1300/q/80/format/webp"
                alt="shipping icon"
                width={16}
                height={8}
                className="w-4 h-2"
              />
              <Image
                src="https://aimg.kwcdn.com/material-put/20237f66ca/7637744c-3af9-4370-b348-7f76f3881a34.png?imageView2/2/w/1300/q/80/format/webp"
                alt="icon"
                width={4}
                height={8}
                className="w-1 h-2"
              />
              <span className="text-white text-xs font-medium">Free shipping from this seller</span>
            </div>
          </div>

          <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center bg-green-800 rounded-sm px-1 py-1">
            <span className="text-white text-xs font-medium">No import charges</span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="https://aimg.kwcdn.com/upload_aimg/web/a6027173-542b-42fb-b114-b8aa52b04c0d.png.slim.png?imageView2/2/w/48/q/60/format/webp"
              alt="Local warehouse"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-green-800 text-sm font-medium">Local warehouse</span>
          </div>
        </div>

        <h1 className="text-lg font-semibold mb-2">
          Large Kitchen Pantry Cabinet Storage Organizer with Adjustable Shelves
        </h1>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">4.3K+ Sold | Sold by Temu</div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-xs text-orange-500 font-medium">4.2 (1,847)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-orange-600">$73.57</span>
          <span className="text-lg text-gray-500 line-through">$125.99</span>
          <div className="flex items-center bg-orange-50 rounded-sm px-1 py-1 border border-orange-200">
            <span className="text-orange-600 text-xs font-medium">-42% limited time</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>✓ Free delivery over $89</p>
          <p>✓ 90-day free returns</p>
          <p>✓ Ships from USA</p>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex justify-center">
          <div id="product-component-1751534676989"></div>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <h2 className="text-lg font-semibold mb-4">Reviews</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">4.7</span>
              <span className="text-sm text-gray-500">(2,847 reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
            <svg viewBox="0 0 1024 1024" className="h-3 w-3 text-green-800" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            </svg>
            <span className="text-xs text-green-800 font-medium">Verified purchases</span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 ${review.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                >
                  {review.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                  {review.hasPhotos && (
                    <div className="flex gap-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Review photo"
                        width={60}
                        height={60}
                        className="rounded border"
                      />
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Review photo"
                        width={60}
                        height={60}
                        className="rounded border"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <svg viewBox="0 0 1024 1024" className="h-3 w-3" fill="currentColor">
                        <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.8-5.4 99.3-41.3 180.7-131 180.7-244.2 0-36.3-7.5-72.4-21.9-105.8z" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                    <button className="hover:text-gray-700">Share</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Reviews
        </Button>
      </div>

      <div className="bg-white mt-2 p-4">
        <h2 className="text-lg font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 gap-3">
          {relatedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.rating})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-orange-600">{product.price}</span>
                <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-8">
        <div className="p-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="hover:text-gray-800 cursor-pointer">Home</span>
              <span className="mx-2">›</span>
              <span className="hover:text-gray-800 cursor-pointer">Appliances</span>
              <span className="mx-2">›</span>
              <span className="hover:text-gray-800 cursor-pointer">Fans & Air Conditioners</span>
              <span className="mx-2">›</span>
            </div>
            <p className="text-sm text-gray-700">
              Adjustable air conditioning deflector, 8pcs wall-mounted deflectors, multi-angle airflow guide for
              enhanced efficiency in cooling/heating circulation, wind protection, and anti-condensation
            </p>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4">
            {/* Company Info */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFooterSection("Company info")}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium text-gray-900">Company info</span>
                {expandedFooterSection === "Company info" ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedFooterSection === "Company info" && (
                <div className="mt-3 space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    About Temu
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Careers
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Press
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Investor Relations
                  </a>
                </div>
              )}
            </div>

            {/* Customer Service */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFooterSection("Customer service")}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium text-gray-900">Customer service</span>
                {expandedFooterSection === "Customer service" ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedFooterSection === "Customer service" && (
                <div className="mt-3 space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Help Center
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Contact Us
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Return Policy
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Shipping Info
                  </a>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFooterSection("Help")}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium text-gray-900">Help</span>
                {expandedFooterSection === "Help" ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedFooterSection === "Help" && (
                <div className="mt-3 space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Support center
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Sitemap
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    Temu purchase protection
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    How to order
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                    How to track
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 my-6">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
              </svg>
            </a>
          </div>

          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">© 2022 - 2025 Whaleco Inc.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
              <a href="#" className="hover:text-gray-800 underline">
                Terms of use
              </a>
              <a href="#" className="hover:text-gray-800 underline">
                Privacy policy
              </a>
              <a href="#" className="hover:text-gray-800 underline">
                Consumer health data privacy policy
              </a>
              <a href="#" className="hover:text-gray-800 underline">
                Ad Choices
              </a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800 underline">
                Your privacy choices
              </a>
              <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
