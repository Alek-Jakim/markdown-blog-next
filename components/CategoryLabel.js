import Link from "next/link"

const CategoryLabel = ({children}) => {

    const colorKey = {
        "Muay-Thai": "yellow",
        Boxing: "blue",
        BJJ: "green",
        Karate: "purple",
        MMA: "red",
        Wrestling: "pink"
    }

    return (
        <div className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}>
            <Link href={`/blog/category/${children.toLowerCase()}`}>
                {children}
            </Link>
        </div>
    )
}

export default CategoryLabel
