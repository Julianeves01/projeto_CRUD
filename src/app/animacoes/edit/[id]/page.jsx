"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAnimacao() {
	const params = useParams();
	const router = useRouter();
	const [form, setForm] = useState({
		title: "",
		rating: "",
		plot: ""
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (params.id) {
			fetchAnimacao(params.id);
		}
	}, [params.id]);


	const slugToTitle = (slug) => {
		return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	};

	const titleToSlug = (title) => {
		return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
	};

	const fetchAnimacao = async (slug) => {
		try {
			setLoading(true);
			const response = await axios.get("https://api.sampleapis.com/movies/animation");
			const filmes = response.data;
			const filmeEncontrado = filmes.find(filme => titleToSlug(filme.title || "") === slug);
			if (filmeEncontrado) {
				setForm({
					title: filmeEncontrado.title || "",
					rating: filmeEncontrado.rating || "",
					plot: filmeEncontrado.plot || ""
				});
			} else {
				setError("Filme não encontrado");
			}
		} catch (err) {
			setError("Erro ao buscar dados");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleGenresChange = (e) => {
		setForm((prev) => ({ ...prev, genres: e.target.value.split(",").map(g => g.trim()) }));
	};

	const validate = () => {
					return (
						form.title.trim() &&
						form.rating.trim() &&
						form.plot.trim()
					);
	};

	const handleSubmit = async (e) => {
				e.preventDefault();
				if (!validate()) {
					toast.error("Preencha todos os campos!");
					return;
				}
				// Salva no sessionStorage
				try {
					const slug = params.id;
					let filmes = [];
					const filmesStorage = sessionStorage.getItem('filmesEditados');
					if (filmesStorage) {
						filmes = JSON.parse(filmesStorage);
						// Remove o antigo se existir
						filmes = filmes.filter(f => f.slug !== slug);
					}
					filmes.push({ ...form, slug });
					sessionStorage.setItem('filmesEditados', JSON.stringify(filmes));
					toast.success("Alterações salvas localmente!");
					setTimeout(() => router.push("/catalogo"), 2000);
				} catch {
					toast.error("Erro ao salvar no sessionStorage!");
				}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Header />
				<p>Carregando...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Header />
				<p className="text-red-500">{error}</p>
				<Link href="/catalogo"><button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Voltar ao Catálogo</button></Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center px-2 py-2">
				<div className="w-full h-full flex items-center justify-center">
					<div className="w-full max-w-md bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-blue-100 flex flex-col justify-center mx-2 my-4">
						<h1 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">Editar Animação</h1>
						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
								<input name="title" value={form.title} onChange={handleChange} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-gray-900 font-medium text-base transition" />
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Avaliação IMDb</label>
								<input name="rating" value={form.rating} onChange={handleChange} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-gray-900 font-medium text-base transition" placeholder="Ex: 8.4/10" />
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Sinopse</label>
								<textarea name="plot" value={form.plot} onChange={handleChange} rows={3} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-gray-900 font-medium text-base transition resize-none" />
							</div>
							<button type="submit" className="w-full py-2 rounded-lg font-bold text-base bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600 transition">Salvar Alterações</button>
						</form>
						<div className="flex gap-4 mt-6 justify-center">
							<Link href="/catalogo">
								<button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition flex items-center gap-2 text-base">
									<span>📋</span> Voltar à Listagem
								</button>
							</Link>
							<Link href="/">
								<button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition flex items-center gap-2 text-base">
									<span>🏠</span> Home
								</button>
							</Link>
						</div>
						<ToastContainer position="top-right" autoClose={2000} />
					</div>
				</div>
			</main>
		</div>
	);
}
