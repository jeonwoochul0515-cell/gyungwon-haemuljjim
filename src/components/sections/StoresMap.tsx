// 카카오맵 + CustomOverlay로 펄럭이는 깃발 마커를 표시
import { useEffect, useMemo, useState } from "react";
import {
  Map,
  CustomOverlayMap,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { stores, type Store } from "../../data/stores";
import { cn } from "../../lib/cn";
import "./stores-map.css";

const KOREA_SOUTH_CENTER = { lat: 35.25, lng: 128.4 } as const;
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;

interface Props {
  items?: Store[];
  className?: string;
}

export function StoresMap({ items, className }: Props) {
  const list = items ?? stores;
  const markers = useMemo(
    () => list.filter((s): s is Store & { coords: [number, number] } => !!s.coords),
    [list]
  );

  if (!KAKAO_JS_KEY) {
    return (
      <div className={cn(className, "kw-map-fallback")}>
        <div className="kw-map-fallback-inner">
          <div className="kw-map-fallback-title">지도 API 키 미설정</div>
          <p className="kw-map-fallback-desc">
            <code>website/.env</code>에 <code>VITE_KAKAO_JS_KEY</code>를 추가하면
            전체 매장이 펄럭이는 깃발로 표시됩니다.
          </p>
          <p className="kw-map-fallback-list">현재 검색된 매장 {markers.length}개</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <KakaoMapInner markers={markers} />
    </div>
  );
}

function KakaoMapInner({
  markers,
}: {
  markers: (Store & { coords: [number, number] })[];
}) {
  const [loading, error] = useKakaoLoader({ appkey: KAKAO_JS_KEY! });
  const [active, setActive] = useState<Store | null>(null);
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
  const [bounds, setBounds] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // 검색 결과가 바뀌면 자동으로 뷰포트를 맞춘다
  useEffect(() => {
    if (!mapInstance || markers.length === 0) return;
    if (markers.length === 1) {
      mapInstance.setCenter(
        new window.kakao.maps.LatLng(markers[0].coords[0], markers[0].coords[1])
      );
      mapInstance.setLevel(5);
      return;
    }
    const kakaoBounds = new window.kakao.maps.LatLngBounds();
    markers.forEach((s) => {
      kakaoBounds.extend(
        new window.kakao.maps.LatLng(s.coords[0], s.coords[1])
      );
    });
    mapInstance.setBounds(kakaoBounds, 60, 60, 60, 60);
    setBounds({ lat: 0, lng: 0 }); // 더미 트리거
  }, [mapInstance, markers]);

  if (error) {
    return (
      <div className="kw-map-fallback">
        <div className="kw-map-fallback-inner">
          <div className="kw-map-fallback-title">지도 로드 실패</div>
          <p className="kw-map-fallback-desc">
            카카오 디벨로퍼스 콘솔에서 사이트 도메인이 등록됐는지 확인해 주세요.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="kw-map-fallback">
        <div className="kw-map-fallback-inner">
          <div className="kw-map-fallback-title">지도 불러오는 중…</div>
        </div>
      </div>
    );
  }

  void bounds;

  return (
    <Map
      center={KOREA_SOUTH_CENTER}
      level={9}
      className="kw-map"
      style={{ width: "100%", height: "100%" }}
      onCreate={setMapInstance}
    >
      {markers.map((s, i) => {
        const verifiedClass =
          s.verified === "본사"
            ? "is-verified"
            : s.verified === "교차"
            ? "is-cross"
            : "";
        return (
          <CustomOverlayMap
            key={s.slug}
            position={{ lat: s.coords[0], lng: s.coords[1] }}
            yAnchor={1}
            xAnchor={0.5}
            zIndex={1}
          >
            <button
              type="button"
              className={cn("kw-flag", verifiedClass)}
              style={{ animationDelay: `${(i % 5) * -0.25}s` }}
              onClick={() => setActive(s)}
              aria-label={`${s.name} 정보 보기`}
            >
              <span className="kw-flag-base" />
              <span className="kw-flag-pole" />
              <span className="kw-flag-cloth">
                <span className="kw-flag-text">{s.name}</span>
              </span>
            </button>
          </CustomOverlayMap>
        );
      })}

      {active && active.coords && (
        <CustomOverlayMap
          position={{ lat: active.coords[0], lng: active.coords[1] }}
          yAnchor={1.4}
          xAnchor={0.5}
          zIndex={3}
        >
          <div className="kw-pop-card" role="dialog">
            <button
              type="button"
              className="kw-pop-close"
              onClick={() => setActive(null)}
              aria-label="닫기"
            >
              ×
            </button>
            <div className="kw-pop-region">
              {active.region.replace("경남-", "")}
            </div>
            <div className="kw-pop-name">{active.name}</div>
            <div className="kw-pop-addr">{active.address}</div>
            {active.phone && (
              <a
                href={`tel:${active.phone.replace(/-/g, "")}`}
                className="kw-pop-tel"
              >
                {active.phone}
              </a>
            )}
            {active.hours && <div className="kw-pop-hours">{active.hours}</div>}
            <a
              className="kw-pop-link"
              href={`https://map.kakao.com/link/search/${encodeURIComponent(
                "경원해물찜 " + active.name
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              카카오맵에서 길찾기
            </a>
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
}
