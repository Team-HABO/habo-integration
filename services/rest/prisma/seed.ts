import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	const authorsData = [
		{ id: 1, name: "George", surname: "Orwell" },
		{ id: 2, name: "J.R.R.", surname: "Tolkien" },
		{ id: 3, name: "Jane", surname: "Austen" },
		{ id: 4, name: "Mark", surname: "Twain" },
		{ id: 5, name: "Ernest", surname: "Hemingway" },
		{ id: 6, name: "F. Scott", surname: "Fitzgerald" },
		{ id: 7, name: "Charles", surname: "Dickens" },
		{ id: 8, name: "Leo", surname: "Tolstoy" },
		{ id: 9, name: "Fyodor", surname: "Dostoevsky" },
		{ id: 10, name: "Virginia", surname: "Woolf" },
		{ id: 11, name: "Herman", surname: "Melville" },
		{ id: 12, name: "Franz", surname: "Kafka" },
		{ id: 13, name: "Gabriel", surname: "García Márquez" },
		{ id: 14, name: "Aldous", surname: "Huxley" },
		{ id: 15, name: "Ray", surname: "Bradbury" }
	];

	const companiesData = [
		{ id: 1, name: "Secker & Warburg" },
		{ id: 2, name: "Allen & Unwin" },
		{ id: 3, name: "Penguin Books" },
		{ id: 4, name: "HarperCollins" },
		{ id: 5, name: "Random House" },
		{ id: 6, name: "Simon & Schuster" },
		{ id: 7, name: "Macmillan Publishers" },
		{ id: 8, name: "Oxford University Press" },
		{ id: 9, name: "Scribner" },
		{ id: 10, name: "Vintage Books" }
	];

	for (const author of authorsData) {
		await prisma.author.upsert({
			where: { id: author.id },
			update: {},
			create: { name: author.name, surname: author.surname }
		});
	}

	for (const company of companiesData) {
		await prisma.publishingCompany.upsert({
			where: { id: company.id },
			update: {},
			create: { name: company.name }
		});
	}

	const booksData = [
		// George Orwell (1)
		{ id: 1, title: "1984", publishingYear: 1949, authorId: 1, publishingCompanyId: 1 },
		{ id: 2, title: "Animal Farm", publishingYear: 1945, authorId: 1, publishingCompanyId: 1 },
		{ id: 3, title: "Homage to Catalonia", publishingYear: 1938, authorId: 1, publishingCompanyId: 1 },
		{ id: 4, title: "Down and Out in Paris and London", publishingYear: 1933, authorId: 1, publishingCompanyId: 3 },
		{ id: 5, title: "Burmese Days", publishingYear: 1934, authorId: 1, publishingCompanyId: 3 },
		{ id: 6, title: "Keep the Aspidistra Flying", publishingYear: 1936, authorId: 1, publishingCompanyId: 4 },
		{ id: 7, title: "Coming Up for Air", publishingYear: 1939, authorId: 1, publishingCompanyId: 4 },
		// J.R.R. Tolkien (2)
		{ id: 8, title: "The Hobbit", publishingYear: 1937, authorId: 2, publishingCompanyId: 2 },
		{ id: 9, title: "The Fellowship of the Ring", publishingYear: 1954, authorId: 2, publishingCompanyId: 2 },
		{ id: 10, title: "The Two Towers", publishingYear: 1954, authorId: 2, publishingCompanyId: 2 },
		{ id: 11, title: "The Return of the King", publishingYear: 1955, authorId: 2, publishingCompanyId: 2 },
		{ id: 12, title: "The Silmarillion", publishingYear: 1977, authorId: 2, publishingCompanyId: 2 },
		{ id: 13, title: "Unfinished Tales", publishingYear: 1980, authorId: 2, publishingCompanyId: 2 },
		{ id: 14, title: "The Children of Húrin", publishingYear: 2007, authorId: 2, publishingCompanyId: 2 },
		// Jane Austen (3)
		{ id: 15, title: "Pride and Prejudice", publishingYear: 1813, authorId: 3, publishingCompanyId: 3 },
		{ id: 16, title: "Sense and Sensibility", publishingYear: 1811, authorId: 3, publishingCompanyId: 3 },
		{ id: 17, title: "Emma", publishingYear: 1815, authorId: 3, publishingCompanyId: 3 },
		{ id: 18, title: "Mansfield Park", publishingYear: 1814, authorId: 3, publishingCompanyId: 3 },
		{ id: 19, title: "Northanger Abbey", publishingYear: 1817, authorId: 3, publishingCompanyId: 3 },
		{ id: 20, title: "Persuasion", publishingYear: 1817, authorId: 3, publishingCompanyId: 3 },
		// Mark Twain (4)
		{ id: 21, title: "The Adventures of Tom Sawyer", publishingYear: 1876, authorId: 4, publishingCompanyId: 5 },
		{ id: 22, title: "Adventures of Huckleberry Finn", publishingYear: 1884, authorId: 4, publishingCompanyId: 5 },
		{ id: 23, title: "A Connecticut Yankee in King Arthur's Court", publishingYear: 1889, authorId: 4, publishingCompanyId: 5 },
		{ id: 24, title: "The Prince and the Pauper", publishingYear: 1881, authorId: 4, publishingCompanyId: 5 },
		{ id: 25, title: "Life on the Mississippi", publishingYear: 1883, authorId: 4, publishingCompanyId: 6 },
		{ id: 26, title: "Roughing It", publishingYear: 1872, authorId: 4, publishingCompanyId: 6 },
		{ id: 27, title: "The Innocents Abroad", publishingYear: 1869, authorId: 4, publishingCompanyId: 6 },
		// Ernest Hemingway (5)
		{ id: 28, title: "The Old Man and the Sea", publishingYear: 1952, authorId: 5, publishingCompanyId: 9 },
		{ id: 29, title: "A Farewell to Arms", publishingYear: 1929, authorId: 5, publishingCompanyId: 9 },
		{ id: 30, title: "For Whom the Bell Tolls", publishingYear: 1940, authorId: 5, publishingCompanyId: 9 },
		{ id: 31, title: "The Sun Also Rises", publishingYear: 1926, authorId: 5, publishingCompanyId: 9 },
		{ id: 32, title: "To Have and Have Not", publishingYear: 1937, authorId: 5, publishingCompanyId: 9 },
		{ id: 33, title: "Across the River and into the Trees", publishingYear: 1950, authorId: 5, publishingCompanyId: 9 },
		{ id: 34, title: "Islands in the Stream", publishingYear: 1970, authorId: 5, publishingCompanyId: 9 },
		// F. Scott Fitzgerald (6)
		{ id: 35, title: "The Great Gatsby", publishingYear: 1925, authorId: 6, publishingCompanyId: 9 },
		{ id: 36, title: "Tender Is the Night", publishingYear: 1934, authorId: 6, publishingCompanyId: 9 },
		{ id: 37, title: "This Side of Paradise", publishingYear: 1920, authorId: 6, publishingCompanyId: 9 },
		{ id: 38, title: "The Beautiful and Damned", publishingYear: 1922, authorId: 6, publishingCompanyId: 9 },
		{ id: 39, title: "The Last Tycoon", publishingYear: 1941, authorId: 6, publishingCompanyId: 9 },
		// Charles Dickens (7)
		{ id: 40, title: "Oliver Twist", publishingYear: 1837, authorId: 7, publishingCompanyId: 7 },
		{ id: 41, title: "A Tale of Two Cities", publishingYear: 1859, authorId: 7, publishingCompanyId: 7 },
		{ id: 42, title: "Great Expectations", publishingYear: 1861, authorId: 7, publishingCompanyId: 7 },
		{ id: 43, title: "David Copperfield", publishingYear: 1850, authorId: 7, publishingCompanyId: 7 },
		{ id: 44, title: "Bleak House", publishingYear: 1853, authorId: 7, publishingCompanyId: 7 },
		{ id: 45, title: "Dombey and Son", publishingYear: 1848, authorId: 7, publishingCompanyId: 7 },
		{ id: 46, title: "Nicholas Nickleby", publishingYear: 1839, authorId: 7, publishingCompanyId: 7 },
		{ id: 47, title: "The Pickwick Papers", publishingYear: 1837, authorId: 7, publishingCompanyId: 7 },
		// Leo Tolstoy (8)
		{ id: 48, title: "War and Peace", publishingYear: 1869, authorId: 8, publishingCompanyId: 10 },
		{ id: 49, title: "Anna Karenina", publishingYear: 1878, authorId: 8, publishingCompanyId: 10 },
		{ id: 50, title: "The Death of Ivan Ilyich", publishingYear: 1886, authorId: 8, publishingCompanyId: 10 },
		{ id: 51, title: "Resurrection", publishingYear: 1899, authorId: 8, publishingCompanyId: 10 },
		{ id: 52, title: "The Kingdom of God Is Within You", publishingYear: 1894, authorId: 8, publishingCompanyId: 10 },
		{ id: 53, title: "Childhood", publishingYear: 1852, authorId: 8, publishingCompanyId: 10 },
		{ id: 54, title: "Boyhood", publishingYear: 1854, authorId: 8, publishingCompanyId: 10 },
		// Fyodor Dostoevsky (9)
		{ id: 55, title: "Crime and Punishment", publishingYear: 1866, authorId: 9, publishingCompanyId: 10 },
		{ id: 56, title: "The Brothers Karamazov", publishingYear: 1880, authorId: 9, publishingCompanyId: 10 },
		{ id: 57, title: "The Idiot", publishingYear: 1869, authorId: 9, publishingCompanyId: 10 },
		{ id: 58, title: "Demons", publishingYear: 1872, authorId: 9, publishingCompanyId: 10 },
		{ id: 59, title: "Notes from Underground", publishingYear: 1864, authorId: 9, publishingCompanyId: 10 },
		{ id: 60, title: "The Gambler", publishingYear: 1867, authorId: 9, publishingCompanyId: 10 },
		{ id: 61, title: "Poor Folk", publishingYear: 1846, authorId: 9, publishingCompanyId: 10 },
		// Virginia Woolf (10)
		{ id: 62, title: "Mrs Dalloway", publishingYear: 1925, authorId: 10, publishingCompanyId: 8 },
		{ id: 63, title: "To the Lighthouse", publishingYear: 1927, authorId: 10, publishingCompanyId: 8 },
		{ id: 64, title: "Orlando", publishingYear: 1928, authorId: 10, publishingCompanyId: 8 },
		{ id: 65, title: "The Waves", publishingYear: 1931, authorId: 10, publishingCompanyId: 8 },
		{ id: 66, title: "A Room of One's Own", publishingYear: 1929, authorId: 10, publishingCompanyId: 8 },
		{ id: 67, title: "The Years", publishingYear: 1937, authorId: 10, publishingCompanyId: 8 },
		{ id: 68, title: "Night and Day", publishingYear: 1919, authorId: 10, publishingCompanyId: 8 },
		// Herman Melville (11)
		{ id: 69, title: "Moby-Dick", publishingYear: 1851, authorId: 11, publishingCompanyId: 5 },
		{ id: 70, title: "Billy Budd", publishingYear: 1924, authorId: 11, publishingCompanyId: 5 },
		{ id: 71, title: "Typee", publishingYear: 1846, authorId: 11, publishingCompanyId: 5 },
		{ id: 72, title: "Omoo", publishingYear: 1847, authorId: 11, publishingCompanyId: 5 },
		{ id: 73, title: "Mardi", publishingYear: 1849, authorId: 11, publishingCompanyId: 5 },
		{ id: 74, title: "Redburn", publishingYear: 1849, authorId: 11, publishingCompanyId: 5 },
		{ id: 75, title: "White-Jacket", publishingYear: 1850, authorId: 11, publishingCompanyId: 5 },
		// Franz Kafka (12)
		{ id: 76, title: "The Trial", publishingYear: 1925, authorId: 12, publishingCompanyId: 6 },
		{ id: 77, title: "The Castle", publishingYear: 1926, authorId: 12, publishingCompanyId: 6 },
		{ id: 78, title: "Amerika", publishingYear: 1927, authorId: 12, publishingCompanyId: 6 },
		{ id: 79, title: "The Metamorphosis", publishingYear: 1915, authorId: 12, publishingCompanyId: 6 },
		{ id: 80, title: "In the Penal Colony", publishingYear: 1919, authorId: 12, publishingCompanyId: 6 },
		// Gabriel García Márquez (13)
		{ id: 81, title: "One Hundred Years of Solitude", publishingYear: 1967, authorId: 13, publishingCompanyId: 4 },
		{ id: 82, title: "Love in the Time of Cholera", publishingYear: 1985, authorId: 13, publishingCompanyId: 4 },
		{ id: 83, title: "The Autumn of the Patriarch", publishingYear: 1975, authorId: 13, publishingCompanyId: 4 },
		{ id: 84, title: "Chronicle of a Death Foretold", publishingYear: 1981, authorId: 13, publishingCompanyId: 4 },
		{ id: 85, title: "No One Writes to the Colonel", publishingYear: 1961, authorId: 13, publishingCompanyId: 4 },
		{ id: 86, title: "In Evil Hour", publishingYear: 1962, authorId: 13, publishingCompanyId: 4 },
		{ id: 87, title: "The General in His Labyrinth", publishingYear: 1989, authorId: 13, publishingCompanyId: 4 },
		// Aldous Huxley (14)
		{ id: 88, title: "Brave New World", publishingYear: 1932, authorId: 14, publishingCompanyId: 4 },
		{ id: 89, title: "Point Counter Point", publishingYear: 1928, authorId: 14, publishingCompanyId: 4 },
		{ id: 90, title: "Eyeless in Gaza", publishingYear: 1936, authorId: 14, publishingCompanyId: 4 },
		{ id: 91, title: "Crome Yellow", publishingYear: 1921, authorId: 14, publishingCompanyId: 4 },
		{ id: 92, title: "Antic Hay", publishingYear: 1923, authorId: 14, publishingCompanyId: 4 },
		{ id: 93, title: "Island", publishingYear: 1962, authorId: 14, publishingCompanyId: 3 },
		{ id: 94, title: "After Many a Summer Dies the Swan", publishingYear: 1939, authorId: 14, publishingCompanyId: 3 },
		// Ray Bradbury (15)
		{ id: 95, title: "Fahrenheit 451", publishingYear: 1953, authorId: 15, publishingCompanyId: 6 },
		{ id: 96, title: "The Martian Chronicles", publishingYear: 1950, authorId: 15, publishingCompanyId: 6 },
		{ id: 97, title: "Something Wicked This Way Comes", publishingYear: 1962, authorId: 15, publishingCompanyId: 6 },
		{ id: 98, title: "Dandelion Wine", publishingYear: 1957, authorId: 15, publishingCompanyId: 6 },
		{ id: 99, title: "Death Is a Lonely Business", publishingYear: 1985, authorId: 15, publishingCompanyId: 6 },
		{ id: 100, title: "A Graveyard for Lunatics", publishingYear: 1990, authorId: 15, publishingCompanyId: 6 },
		{ id: 101, title: "From the Dust Returned", publishingYear: 2001, authorId: 15, publishingCompanyId: 6 },
		{ id: 102, title: "Let's All Kill Constance", publishingYear: 2002, authorId: 15, publishingCompanyId: 6 }
	];

	for (const book of booksData) {
		await prisma.book.upsert({
			where: { id: book.id },
			update: {},
			create: {
				title: book.title,
				publishingYear: book.publishingYear,
				authorId: book.authorId,
				publishingCompanyId: book.publishingCompanyId
			}
		});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
