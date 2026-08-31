import Link from "next/link";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS } from "@/lib/targets";
import { services } from "@/data/services";

export default function Home() {
  const count = services.length;

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold sm:text-3xl">
          내 지역 복지·지원금 찾기
        </h1>
        <p className="text-slate-600">
          중앙부처와 226개 시·군·구가 따로 공고하는 복지 서비스를 한곳에
          모읍니다. 지역과 대상을 고르면 해당하는 사업만 보여드립니다.
        </p>
      </section>

      {count === 0 && (
        /*
          데이터가 아직 없다. 빈 목록을 그럴듯하게 감추는 대신 상태를 그대로
          드러낸다. 예시 데이터를 넣어 두면 나중에 진짜 데이터인 척 남는다.
        */
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">준비 중입니다</p>
          <p className="mt-1">
            공공데이터포털 인증키 발급 후 복지 서비스 데이터를 수집합니다.
            현재 등록된 서비스는 0건입니다.
          </p>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">지역으로 찾기</h2>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SIDO_LIST.map((sido) => (
            <li key={sido.slug}>
              <Link
                href={`/region/${sido.slug}`}
                className="block rounded-md border border-slate-200 px-3 py-2 text-center text-sm hover:border-slate-400"
              >
                {sido.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">대상으로 찾기</h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TARGETS.map((target) => (
            <li key={target.slug}>
              <Link
                href={`/target/${target.slug}`}
                className="block rounded-md border border-slate-200 px-3 py-2 text-center text-sm hover:border-slate-400"
              >
                {target.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
