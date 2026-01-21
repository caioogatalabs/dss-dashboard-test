import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Skeleton</h1>
        <p className="text-muted-foreground">
          Componente de loading placeholder para indicar carregamento de conteúdo.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Shapes</h2>
        <p className="text-sm text-muted-foreground mb-4">Diferentes formas e tamanhos de skeleton.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lines</CardTitle>
              <CardDescription>Skeletons de linha para texto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Circles</CardTitle>
              <CardDescription>Skeletons circulares para avatares</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rectangles</CardTitle>
              <CardDescription>Skeletons retangulares para imagens/cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mixed Sizes</CardTitle>
              <CardDescription>Combinação de diferentes tamanhos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Loading Patterns</h2>
        <p className="text-sm text-muted-foreground mb-4">Padrões comuns de loading state.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Loading state de perfil de usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Card</CardTitle>
              <CardDescription>Loading state de card de artigo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comment List</CardTitle>
              <CardDescription>Loading state de lista de comentários</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>Loading state de tabela de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-4 gap-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form</CardTitle>
              <CardDescription>Loading state de formulário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Grid</CardTitle>
              <CardDescription>Loading state de grid de produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-32 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Full Page Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Full Page Layouts</h2>
        <p className="text-sm text-muted-foreground mb-4">Loading states de páginas completas.</p>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Loading state de dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Post</CardTitle>
            <CardDescription>Loading state de post de blog</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Usage Documentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Uso</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Import</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { Skeleton } from "@/components/ui/skeleton"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-[90%]" />
  <Skeleton className="h-4 w-[80%]" />
</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Profile Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                O componente Skeleton aceita todas as props de um elemento <code>div</code> HTML padrão.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><code>className</code> - Classes CSS adicionais para customizar tamanho, forma e estilo</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Use classes do Tailwind para customizar:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Altura:</strong> <code>h-4</code>, <code>h-12</code>, <code>h-48</code>, etc.</li>
                <li><strong>Largura:</strong> <code>w-full</code>, <code>w-1/2</code>, <code>w-[200px]</code>, etc.</li>
                <li><strong>Bordas:</strong> <code>rounded-full</code>, <code>rounded-md</code>, <code>rounded-lg</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Mantenha o skeleton similar ao layout final do conteúdo</li>
              <li>Use skeletons enquanto dados estão sendo carregados</li>
              <li>Combine com estados de loading para melhor UX</li>
              <li>Prefira skeletons a spinners para conteúdo estruturado</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>O skeleton é puramente visual e não precisa de ARIA labels</li>
              <li>Combine com <code>aria-busy</code> no container pai durante carregamento</li>
              <li>Anuncie quando o conteúdo terminar de carregar para screen readers</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
