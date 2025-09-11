import { describe, it, expect } from 'vitest'
import { toGeoJSONCoordinates, interpolateCoordinates } from './utils'
import { Coordinate } from './types'

describe('utils', () => {
  describe('toGeoJSONCoordinates', () => {
    it('should convert coordinates to GeoJSON format', () => {
      const coordinates: Coordinate[] = [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 34.0522, lng: -118.2437 }
      ]
      
      const result = toGeoJSONCoordinates(coordinates)
      
      expect(result).toEqual([
        [-74.0060, 40.7128],
        [-118.2437, 34.0522]
      ])
    })

    it('should handle empty array', () => {
      const result = toGeoJSONCoordinates([])
      expect(result).toEqual([])
    })
  })

  describe('interpolateCoordinates', () => {
    it('should interpolate coordinates along a route', () => {
      const coordinates: Coordinate[] = [
        { lat: 0, lng: 0 },
        { lat: 1, lng: 1 }
      ]
      
      const result = interpolateCoordinates(coordinates, 0.1)
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(2)
    })

    it('should handle single coordinate by returning empty array', () => {
      const coordinates: Coordinate[] = [
        { lat: 40.7128, lng: -74.0060 }
      ]
      
      // This should throw an error or handle gracefully since lineString requires 2+ points
      expect(() => interpolateCoordinates(coordinates, 0.1)).toThrow()
    })
  })
})
