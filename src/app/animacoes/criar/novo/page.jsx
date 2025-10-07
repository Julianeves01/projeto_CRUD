"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CriarAnimacao() {
	const router = useRouter();
	const [form, setForm] = useState({
		title: "",
		rating: "",
		plot: "",
		poster: ""
	});
	const [imagePreview, setImagePreview] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		
		// Se for o campo poster, mostrar preview da imagem
		if (name === "poster" && value) {
			setImagePreview(value);
		}
	};

	const titleToSlug = (title) => {
		return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
	};

	const validate = () => {
		return (
			form.title.trim() &&
			form.rating.trim() &&
			form.plot.trim() &&
			form.poster.trim()
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) {
			toast.error("Preencha todos os campos obrigatórios (título, avaliação, sinopse e imagem)!");
			return;
		}

		try {
			// Criar o objeto do novo filme
			const novoFilme = {
				id: Date.now(), // ID único baseado no timestamp
				title: form.title.trim(),
				rating: form.rating.trim(),
				plot: form.plot.trim(),
				posterURL: form.poster.trim(), // Mudei para posterURL para compatibilidade
				year: new Date().getFullYear().toString(), // Ano atual automaticamente
				genres: ["Animação"], // Gênero padrão
				director: "Diretor não informado", // Valor padrão
				duration: "Duração não informada", // Valor padrão
				slug: titleToSlug(form.title),
				imdbId: `tt${Date.now()}`, // ID fictício para manter compatibilidade
				createdAt: new Date().toISOString(),
				isCustom: true // Flag para identificar filmes criados pelo usuário
			};

			// Salvar no sessionStorage junto com outros filmes criados
			let filmesCriados = [];
			const filmesStorage = sessionStorage.getItem('filmesCriados');
			if (filmesStorage) {
				filmesCriados = JSON.parse(filmesStorage);
			}
			filmesCriados.push(novoFilme);
			sessionStorage.setItem('filmesCriados', JSON.stringify(filmesCriados));

			toast.success("Filme criado com sucesso!");
			setTimeout(() => router.push("/catalogo"), 2000);
		} catch (error) {
			console.error("Erro ao criar filme:", error);
			toast.error("Erro ao criar o filme. Tente novamente!");
		}
	};

	const handleImageError = () => {
		setImagePreview("");
	};

	return (
		<div className="min-h-screen w-full bg-gray-100 flex flex-col relative overflow-hidden">
			<div className="relative z-20">
				<Header />
			</div>
			
			<main className="flex-1 flex items-center justify-center px-4 py-6 relative z-10">
				<div className="w-full max-w-4xl">
					<div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-300/50 transition-all duration-300">
						
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
								</svg>
							</div>
							<h1 className="text-3xl md:text-4xl font-black text-gray-700 mb-2 tracking-tight">
								Criar Nova <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Animação</span>
							</h1>
							<p className="text-gray-500">Adicione seu filme favorito ao catálogo</p>
						</div>

						<form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Coluna Esquerda - Informações Básicas */}
							<div className="space-y-5">
								<div className="group">
									<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
										<svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20.5A1 1 0 006.5 22h11a1 1 0 001-.5L17 4" />
										</svg>
										Título do Filme *
									</label>
									<input 
										name="title" 
										value={form.title} 
										onChange={handleChange} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium"
										placeholder="Digite o título da animação..."
										required
									/>
								</div>

								<div className="group">
									<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
										<svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										Avaliação IMDb *
									</label>
									<input 
										name="rating" 
										value={form.rating} 
										onChange={handleChange} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium"
										placeholder="Ex: 8.4, 9.1, 7.5..."
										required
									/>
								</div>
							</div>

							{/* Coluna Direita - Imagem e Sinopse */}
							<div className="space-y-5">
								<div className="group">
									<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
										<svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										URL da Imagem (Poster) *
									</label>
									<input 
										name="poster" 
										value={form.poster} 
										onChange={handleChange} 
										type="url"
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium"
										placeholder="https://exemplo.com/poster.jpg"
										required
									/>
								</div>

								{/* Preview da Imagem */}
								{imagePreview && (
									<div className="group">
										<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
											<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
											Preview da Imagem
										</label>
										<div className="relative rounded-xl overflow-hidden border border-gray-300/60 shadow-lg">
											<img 
												src={imagePreview} 
												alt="Preview do poster" 
												className="w-full h-64 object-cover"
												onError={handleImageError}
											/>
										</div>
									</div>
								)}

								<div className="group">
									<label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
										<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										Sinopse & Descrição *
									</label>
									<textarea 
										name="plot" 
										value={form.plot} 
										onChange={handleChange} 
										rows={8} 
										className="w-full bg-white/60 border border-gray-300/60 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm font-medium resize-none"
										placeholder="Descreva a história, personagens, enredo e os momentos mais marcantes do filme..."
										required
									/>
								</div>
							</div>

							{/* Botões - Ocupam toda a largura */}
							<div className="lg:col-span-2 space-y-4">
								<button 
									type="submit" 
									className="w-full py-3 px-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-green-500/50 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-green-700 via-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
									<svg className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
									<span className="relative z-10">Criar Filme</span>
								</button>

								<div className="flex flex-col sm:flex-row gap-3 justify-center">
									<Link href="/catalogo">
										<button type="button" className="w-full sm:w-auto px-6 py-3 bg-white/70 hover:bg-white/90 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-gray-300/50">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
											</svg>
											Voltar ao Catálogo
										</button>
									</Link>
									<Link href="/">
										<button type="button" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
											</svg>
											Página Inicial
										</button>
									</Link>
								</div>
							</div>
						</form>
						
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