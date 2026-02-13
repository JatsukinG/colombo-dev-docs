// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black'

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Cognitus Dev',
            logo: {
                src: './src/assets/code_s.svg',
            },
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight'}],
            sidebar: [
                {
                    label: 'Proyecto',
                    items: [
                        {label: 'Visión General', slug: 'project/overview'},
                    ],
                },
                {
                    label: 'Desarrollo',
                    items: [
                        {label: 'Configuración del Entorno', slug: 'dev/setup'},
                        {label: 'Estilo de Código', slug: 'dev/code-style'},
                        {label: 'Git Workflow', slug: 'dev/git-workflow'},
                        {label: 'Stack Tecnológico', slug: 'dev/tech-stack'},
                    ],
                },
                {
                    label: 'Arquitectura',
                    items: [
                        {label: 'Screaming Architecture', slug: 'architecture/screaming-architecture-react'},
                    ],
                },
            ],
            plugins: [
                starlightThemeBlack({
                    // navLinks: [{ // optional
                    //     label: 'Docs',
                    //     link: '/getting-started',
                    // }],
                    footerText: //optional
                        'Built & designed by Cognitus.'
                })
            ],
        }),
    ],
});
