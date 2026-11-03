import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como ${site.brand.name} ${site.brand.descriptor} trata dados pessoais neste site.`,
};

export default function Privacy() {
  return (
    <main id="conteudo" className="min-h-[100svh] bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Voltar ao início" className="rounded-lg">
            <Logo />
          </Link>
          <Link href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} aria-hidden /> Voltar
          </Link>
        </div>

        <h1 className="display-lg mt-20 text-forest">
          Política de <em className="font-display-italic text-olive">privacidade</em>
        </h1>
        {site.demo && (
          <p className="mt-6 rounded-2xl bg-linen p-5 text-sm leading-relaxed text-ink-soft">
            Texto-modelo de demonstração. Antes da publicação real, esta política deve ser revisada e adaptada
            à prática da profissional e à LGPD (Lei nº 13.709/2018).
          </p>
        )}
        <div className="mt-12 space-y-10 text-[1.02rem] leading-[1.8] text-ink-soft [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-forest">
          <section>
            <h2>Dados coletados</h2>
            <p className="mt-3">
              Este site não possui formulários nem cria contas de usuário. Ao clicar em um botão de agendamento,
              você é direcionado ao WhatsApp, e a conversa passa a seguir as políticas daquele serviço.
            </p>
          </section>
          <section>
            <h2>Cookies e métricas</h2>
            <p className="mt-3">
              Nenhum cookie de rastreamento ou publicidade é utilizado nesta versão. Caso ferramentas de
              análise de acesso sejam adicionadas, esta seção será atualizada.
            </p>
          </section>
          <section>
            <h2>Informações de saúde</h2>
            <p className="mt-3">
              Dados compartilhados durante o atendimento são tratados com sigilo profissional e usados
              exclusivamente para o acompanhamento nutricional.
            </p>
          </section>
          <section>
            <h2>Contato</h2>
            <p className="mt-3">
              Dúvidas sobre privacidade podem ser enviadas pelos canais de contato informados no site.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
