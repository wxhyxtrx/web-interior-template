import { cn } from '@/lib/utils'
import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react'

// Shared types
export type SectionHeaderType = 'horizontal' | 'vertical' | 'centered'

// Context - supaya SectionTitle & SectionDescription tahu orientasi
// header-nya tanpa harus dioper manual sebagai props
const SectionHeaderContext = createContext<SectionHeaderType | undefined>(undefined)

function useSectionHeaderContext() {
  const context = useContext(SectionHeaderContext)
  if (context === undefined) {
    throw new Error(
      'Components <SectionTitle />, <SectionDescription />, or <SectionAction /> must be used within <SectionHeader />.',
    )
  }
  return context
}

// <Section />
// Wrapper paling luar. Buat menunjang SEO nya bang pake semantik
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        data-slot="section"
        className={cn('w-full bg-secondary min-h-screen', className)}
        {...props}
      >
        {children}
      </section>
    )
  },
)
Section.displayName = 'Section'

// <SectionContent />
// Pembungkus padding konten di dalam Section.
export interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SectionContent = forwardRef<HTMLDivElement, SectionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="section-content"
        className={cn(
          'flex flex-col gap-4 px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-16 xl:px-20',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
SectionContent.displayName = 'SectionContent'

// <SectionHeader type="horizontal | vertical" action={...} />
//
/**
 * SectionHeeader ini  SectionTitle dan SectionDescription optional bang jadi kalo tidak ada gaperlu di define SectionHeader nya
 * Tapi kalo mau dipake harus ada title dan description
 *
 * Actionnya juga optional, nanti buat di isi pake button field yang udah tak sediain di fields
 *
 * Visualisasinya kek gini
 * Type vertical:
 * title
 * description
 * action (di kanan sejajar title+description)
 *
 * Type horizontal:
 * title | description
 *        | action (nempel di bawah description)
 */

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: SectionHeaderType
  /** Diharapkan berisi <SectionTitle> dan/atau <SectionDescription>. */
  children?: ReactNode
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ type = 'vertical', className, children, ...props }, ref) => {
    return (
      <SectionHeaderContext.Provider value={type}>
        <div
          ref={ref}
          data-slot="section-header"
          data-type={type}
          className={cn(
            'group gap-4 items-start',
            // vertical = stack ke bawah, baru sejajar mulai breakpoint sm
            type === 'vertical' && 'flex flex-col sm:flex-row sm:items-start sm:justify-between',
            // horizontal = selalu sejajar berdampingan
            type === 'horizontal' && 'flex flex-row items-center justify-between',
            type === 'centered' && 'flex flex-col items-center text-center',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </SectionHeaderContext.Provider>
    )
  },
)
SectionHeader.displayName = 'SectionHeader'

export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    useSectionHeaderContext()
    return (
      <h3
        ref={ref}
        data-slot="section-title"
        className={cn(
          'font-serif text-2xl sm:text-3xl md:text-4xl leading-tight tracking-[-0.01em] text-foreground',
          'group-[data-type=centered]:text-center',
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    )
  },
)
SectionTitle.displayName = 'SectionTitle'

// <SectionDescription />
export interface SectionDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

export const SectionDescription = forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    useSectionHeaderContext()
    return (
      <p
        ref={ref}
        data-slot="section-description"
        className={cn(
          'mt-1.5 text-sm text-muted-foreground max-w-sm leading-relaxed',
          'group-[data-type=centered]:text-center',
          className,
        )}
        {...props}
      >
        {children}
      </p>
    )
  },
)
SectionDescription.displayName = 'SectionDescription'

export interface SectionActionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SectionAction = forwardRef<HTMLDivElement, SectionActionProps>(
  ({ className, children, ...props }, ref) => {
    const type = useSectionHeaderContext()
    void type // hapus baris ini kalau sudah dipakai untuk conditional rendering

    return (
      <div
        ref={ref}
        data-slot="section-action"
        className={cn(
          'shrink-0',
          'group-[data-type=horizontal]:self-end group-[data-type=horizontal]:sm:self-start group-[data-type=horizontal]:mt-1',
          'group-[data-type=centered]:mt-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
SectionAction.displayName = 'SectionAction'

// export default function Demo(): ReactElement {
//   return (
//     <div className="min-h-screen w-full bg-neutral-50 p-8 flex flex-col gap-6 items-center">
//       <div className="w-full max-w-2xl flex flex-col gap-6">
//         {/* Contoh 1: header vertical, action di kanan sejajar title+description */}
//         <Section>
//           <SectionContent>
//             <SectionHeader type="vertical" action={<Btn>Tambah</Btn>}>
//               <SectionTitle>Profil Tim</SectionTitle>
//               <SectionDescription>
//                 Kelola anggota tim dan hak akses mereka di sini.
//               </SectionDescription>
//             </SectionHeader>

//             {/* konten lainnya */}
//             <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3">
//               <span className="text-sm text-neutral-700">Budi Santoso</span>
//               <span className="text-xs text-neutral-400">Admin</span>
//             </div>
//             <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3">
//               <span className="text-sm text-neutral-700">Siti Amalia</span>
//               <span className="text-xs text-neutral-400">Member</span>
//             </div>
//           </SectionContent>
//         </Section>

//         {/* Contoh 2: header horizontal, action nempel di bawah description (kanan) */}
//         <Section>
//           <SectionContent>
//             <SectionHeader type="horizontal" action={<Btn>Simpan</Btn>}>
//               <SectionTitle>Notifikasi</SectionTitle>
//               <SectionDescription>
//                 Atur preferensi notifikasi email dan push.
//               </SectionDescription>
//             </SectionHeader>

//             <div className="flex items-center justify-between text-sm">
//               <span className="text-neutral-700">Email marketing</span>
//               <span className="text-neutral-400">Aktif</span>
//             </div>
//           </SectionContent>
//         </Section>

//         {/* Contoh 3: header centered — cocok untuk empty state / auth card */}
//         <Section>
//           <SectionContent>
//             <SectionHeader type="centered" action={<Btn>Buat Proyek</Btn>}>
//               <SectionTitle>Belum Ada Proyek</SectionTitle>
//               <SectionDescription>
//                 Mulai dengan membuat proyek pertamamu untuk melihatnya di
//                 sini.
//               </SectionDescription>
//             </SectionHeader>
//           </SectionContent>
//         </Section>

//         {/* Contoh 4: tanpa SectionHeader sama sekali — langsung konten */}
//         <Section>
//           <SectionContent>
//             <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3">
//               <span className="text-sm text-neutral-700">
//                 Storage terpakai
//               </span>
//               <span className="text-xs text-neutral-400">4.2 GB / 10 GB</span>
//             </div>
//             <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
//               <div className="h-full w-[42%] rounded-full bg-neutral-900" />
//             </div>
//           </SectionContent>
//         </Section>
//       </div>
//     </div>
//   );
// }
