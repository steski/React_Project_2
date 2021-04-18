import Link from "next/link";

export default function Navigation() {

  return (

	<nav className="site-navigation">
		<Link href="/">
			<a>Start</a>
		</Link>
		<Link href="/Filmliste">
			<a>Filme</a>
		</Link>
		<Link href="/Favoriten">
			<a>Favoriten</a>
		</Link>
		<Link href="/news">
			<a>News</a>
		</Link>
		<Link href="/podcast">
			<a>Podcast</a>
		</Link>
	</nav>
  );
};