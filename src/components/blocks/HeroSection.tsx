'use client'
import React from 'react'
import { ArrowRight, Menu, X, TrendingUp, Shield, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  },
}

const features = [
  { icon: TrendingUp, label: 'Выгодно', desc: 'Сокращаем расходы на IT' },
  { icon: Shield, label: 'Надёжно', desc: 'Следим за сохранностью данных' },
  { icon: Zap, label: 'Быстро', desc: 'Реакция от 15 минут' },
  { icon: Users, label: 'Без штата', desc: 'IT-специалисты без найма в штат' },
]

const stats = [
  { value: 'С 2014', label: 'На рынке IT-аутсорсинга' },
  { value: '25+', label: 'Компаний на обслуживании' },
  { value: '1000+', label: 'Реализованных проектов' },
  { value: '10+', label: 'Отраслей' },
]

export function HeroSection() {
  return (
    <>
      <div className="overflow-hidden">
        {/* Декоративные градиенты */}
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(214,80%,60%,.12)_0,hsla(214,60%,40%,.04)_50%,hsla(214,40%,20%,0)_80%)]" />
          <div className="h-[80rem] absolute right-0 top-0 w-56 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(214,80%,60%,.08)_0,hsla(214,40%,20%,.02)_80%,transparent_100%)] [translate:-5%_-50%]" />
        </div>

        <section>
          <div className="relative pt-28 md:pt-40 pb-20 md:pb-32">
            {/* Фоновый градиент */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center">
                <AnimatedGroup variants={transitionVariants}>
                  {/* Промо-бейдж */}
                  <a
                    href="#prices"
                    className="hover:bg-white/10 group mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 pl-4 shadow-md shadow-black/20 transition-all duration-300 mb-8">
                    <span className="text-white/70 text-sm">Первый месяц со скидкой 20%</span>
                    <span className="block h-4 w-0.5 bg-white/20"></span>
                    <div className="bg-white/10 group-hover:bg-white/20 size-6 overflow-hidden rounded-full duration-300 flex items-center justify-center">
                      <ArrowRight className="size-3 text-white" />
                    </div>
                  </a>

                  {/* Заголовок */}
                  <h1 className="mt-2 max-w-3xl mx-auto text-balance text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Внешний IT-отдел{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      для вашего бизнеса
                    </span>
                  </h1>

                  {/* Лид */}
                  <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/60">
                    Обслуживаем IT-инфраструктуру компании – от рабочих мест до серверов.
                    Поддержка пользователей, сети, 1С, VPN и резервного копирования.
                  </p>
                </AnimatedGroup>

                {/* Кнопки */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <div className="bg-white/10 rounded-[14px] border border-white/10 p-0.5">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-6 text-base bg-blue-600 hover:bg-blue-500 text-white border-0">
                      <a href="#contacts">
                        Бесплатный IT-аудит
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="rounded-xl px-6 text-white/80 hover:text-white hover:bg-white/10">
                    <a href="#prices">Посмотреть тарифы</a>
                  </Button>
                </AnimatedGroup>

                {/* Тезисы-фичи */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.08, delayChildren: 1 },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                  {features.map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex flex-col items-start gap-2 rounded-xl border border-white/8 bg-white/5 p-4 text-left backdrop-blur-sm">
                      <Icon className="size-5 text-blue-400" />
                      <span className="text-sm font-semibold text-white">{label}</span>
                      <span className="text-xs text-white/50 leading-snug">{desc}</span>
                    </div>
                  ))}
                </AnimatedGroup>

                {/* Статистика */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.08, delayChildren: 1.2 },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                  {stats.map(({ value, label }) => (
                    <div
                      key={value}
                      className="rounded-xl border border-white/8 bg-white/5 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">{value}</div>
                      <div className="text-xs text-white/50 mt-1 leading-snug">{label}</div>
                    </div>
                  ))}
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const menuItems = [
  { name: 'Услуги', href: '#services' },
  { name: 'Кейсы', href: '#cases' },
  { name: 'Тарифы', href: '#prices' },
  { name: 'Контакты', href: '#contacts' },
]

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState ? 'active' : undefined} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-[#080e1c]/80 max-w-4xl rounded-2xl border border-white/10 backdrop-blur-lg lg:px-5'
          )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Лого */}
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#top" className="flex items-center gap-2" aria-label="TechSupport">
                <img src="/assets/images/logo-icon.svg" alt="TechSupport" className="h-8 w-auto" />
                <span className="text-white font-semibold text-lg">TechSupport</span>
              </a>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Закрыть меню' : 'Открыть меню'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>

            {/* Десктопное меню */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-white/60 hover:text-white transition-colors duration-150">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA + мобильное меню */}
            <div
              className={cn(
                'bg-[#0c1220] group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none'
              )}>
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-white/60 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                <a href="#contacts">Оставить заявку</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
