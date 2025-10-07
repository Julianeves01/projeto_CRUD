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
		<div className="min-h-screen w-full bg-gray-100 flex flex-col relative overflow-hidden">
			<div className="relative z-20">
				<Header />
			</div>
			
			<main className="flex-1 flex items-center justify-center px-4 py-6 relative z-10">
				<div className="w-full max-w-xl">
					<div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-300/50 transition-all duration-300">
						
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
							</div>
							<h1 className="text-3xl md:text-4xl font-black text-gray-700 mb-2 tracking-tight">
								Editar <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Animação</span>
							</h1>
							<p className="text-gray-500">Personalize os detalhes do seu filme favorito</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="group">
								<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
									<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20.5A1 1 0 006.5 22h11a1 1 0 001-.5L17 4" />
									</svg>
									Título do Filme
								</label>
								<div className="relative">
									<input 
										name="title" 
										value={form.title} 
										onChange={handleChange} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium"
										placeholder="Digite o título da animação..."
									/>
								</div>
							</div>

							<div className="group">
								<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
									<svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
									</svg>
									Avaliação IMDb
								</label>
								<div className="relative">
									<input 
										name="rating" 
										value={form.rating} 
										onChange={handleChange} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium"
										placeholder="Ex: 8.4/10 ou 9.1"
									/>
								</div>
							</div>

							<div className="group">
								<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
									<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Sinopse & Descrição
								</label>
								<div className="relative">
									<textarea 
										name="plot" 
										value={form.plot} 
										onChange={handleChange} 
										rows={4} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium resize-none"
										placeholder="Descreva a história, personagens e enredo..."
									/>
								</div>
							</div>

							<button 
								type="submit" 
								className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
								<svg className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<span className="relative z-10">Salvar Alterações</span>
							</button>
						</form>

						<div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
							<Link href="/catalogo">
								<button className="w-full sm:w-auto px-6 py-3 bg-white/70 hover:bg-white/90 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-gray-300/50">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
									</svg>
									Voltar ao Catálogo
								</button>
							</Link>
							<Link href="/">
								<button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
									</svg>
									Página Inicial
								</button>
							</Link>
						</div>
						
						<ToastContainer 
							position="top-right" 
							autoClose={2000}
							theme="dark"
							toastStyle={{
								backgroundColor: 'rgba(17, 24, 39, 0.95)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)'
							}}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
