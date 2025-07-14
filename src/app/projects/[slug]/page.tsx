import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavButton from "@/components/NavButton";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  Project,
  ProjectImage,
} from "@/data/projects";
import MediaRenderer from "./MediaRenderer";
import { ReactNode } from "react";

// 可复用的标题组件
const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className=" font-medium text-sm mb-2  text-black/54">{children}</h2>
);

// 可复用的列表组件
const ItemList = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-2 text-sm">
    {items.map((item, index) => (
      <li key={index} className="">{item}</li>
    ))}
  </ul>
);

// 可复用的引用列表组件
const ReferenceList = ({ references }: { references: { title: string; source: string }[] }) => (
  <ul className="list-disc pl-5 space-y-2 text-sm">
    {references.map((reference, index) => (
      <li key={index} className="">
        <span className="">{reference.title}</span>
        {reference.source && (
      
            <span className="text-black/54 ml-2 text-sm">
              — {reference.source}
            </span>
        )}
      </li>
    ))}
  </ul>
);

// 可复用的元数据标题组件
const MetadataTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xs uppercase text-black/54 mb-1 ">{children}</h3>
);

// 可复用的区块组件
const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// 项目详情页面组件
export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // 正确的异步处理方式：await params 然后解构
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);

  // 如果找不到数据或者项目配置为外部链接，则返回404
  if (!projectData) {
    notFound();
  }

  // 如果项目有外部链接，直接跳转
  if (projectData.link || projectData.repo) {
    // 我们可以在这里处理外部链接重定向
    // 但因为这是服务端组件，我们只是展示一个链接
  }

  // 提取技术栈
  const techStack = projectData.techStack || [];

  return (
    <main className="bg-white text-black/87 min-h-screen pb-36">
      <div className="max-w-[1034px] mx-auto pt-16 md:pt-24 px-4 md:px-16 xl:px-8">
        {/* 顶部导航和标题 */}
        <div className="font-jetbrains-mono">
          <div className="text-sm md:text-base leading-none text-black/54">
            (02) PROJECTS
          </div>

          {/* 项目标题 */}
          <h1 className="text-4xl md:text-6xl font-bold my-3 md:my-6 leading-tight">
            {projectData.title}
          </h1>

          {/* 面包屑导航 */}
          <div className="flex items-center space-x-2 text-xs md:text-sm text-black/54 leading-none">
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:underline">
              PROJECTS
            </Link>
            <span>/</span>
            <span className="text-black/87">{projectData.title}</span>
          </div>
        </div>

        {/* 项目信息卡片 */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧：项目元数据 */}
          <div className="col-span-1">
            <div className="bg-zinc-50 p-6 rounded-xl space-y-6">
              {/* 项目类型 */}
              <div>
                <MetadataTitle>项目类型</MetadataTitle>
                <p className="text-sm font-medium">{projectData.projectType}</p>
              </div>

              {/* 技术栈 */}
              <div>
                <MetadataTitle>技术栈</MetadataTitle>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white px-2 py-1 rounded-md border border-zinc-200 font-jetbrains-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 角色 */}
              {projectData.role && (
                <div>
                  <MetadataTitle>角色</MetadataTitle>
                  <p className="text-sm">{projectData.role}</p>
                </div>
              )}

              {/* 团队规模 */}
              {projectData.teamSize && (
                <div>
                  <MetadataTitle>团队规模</MetadataTitle>
                  <p className="text-sm">{projectData.teamSize} 人</p>
                </div>
              )}

              {/* 项目周期 */}
              {projectData.duration && (
                <div>
                  <MetadataTitle>项目周期</MetadataTitle>
                  <p className="text-sm">{projectData.duration}</p>
                </div>
              )}

              {/* 外部链接 */}
              <div className="pt-2 space-y-2">
                {projectData.link && (
                  <a
                    href={projectData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center font-medium text-black/87 hover:underline"
                  >
                    访问网站
                    <svg
                      className="ml-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
                {projectData.repo && (
                  <a
                    href={projectData.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center font-medium text-black/87 hover:underline"
                  >
                    查看代码
                    <svg
                      className="ml-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：项目详情 */}
          <div className="col-span-1 md:col-span-2 space-y-10 text-black/87 max-w-[560px]">
            {/* 项目描述 */}
            <Section title="项目概述">
              <p className=" leading-relaxed text-sm">
                {projectData.detailDescription || projectData.description}
              </p>
            </Section>

            {/* 项目亮点 */}
            {projectData.highlights && projectData.highlights.length > 0 && (
              <Section title="项目亮点">
                <ItemList items={projectData.highlights} />
              </Section>
            )}

            {/* 项目挑战 */}
            {projectData.challenges && projectData.challenges.length > 0 && (
              <Section title="项目挑战">
                <ItemList items={projectData.challenges} />
              </Section>
            )}

            {/* 项目解决方案 */}
            {projectData.solutions && projectData.solutions.length > 0 && (
              <Section title="解决方案">
                <ItemList items={projectData.solutions} />
              </Section>
            )}

            {/* 参考文献 */}
            {projectData.references && projectData.references.length > 0 && (
              <Section title="参考文献">
                <ReferenceList references={projectData.references} />
              </Section>
            )}
          </div>
        </div>

        {/* 项目图片展示 */}
        {projectData.images && projectData.images.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="flex flex-col space-y-8">
              {projectData.images.map((image: ProjectImage, index: number) => (
                <div key={index} className="w-full">
                  <div className="w-full">
                    <MediaRenderer
                      src={image.src}
                      alt={
                        image.alt || `${projectData.title} - 图片 ${index + 1}`
                      }
                      priority={index === 0}
                      isVideo={image.isVideo}
                    />
                  </div>

                  {image.caption && (
                    <p className="text-sm mt-2 text-black/54 text-center">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <NavButton />
    </main>
  );
}


